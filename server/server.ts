import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

type RoomUser = { socketId: string; userName: string };

const app = express();
const server = http.createServer(app);

const roomUsers = new Map<string, Map<string, string>>();
const roomCode = new Map<string, string>();

const io = new Server(server, {
  cors: { origin: '*' },
});

const getRoomUsers = (users: Map<string, string>): RoomUser[] =>
  Array.from(users.entries()).map(([socketId, userName]) => ({ socketId, userName }));

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', ({ roomId, userName }: { roomId: string; userName?: string }) => {
    if (!roomId) return;

    const name = (userName || '').trim() || `Guest-${socket.id.slice(0, 4)}`;
    socket.data.roomId = roomId;
    socket.data.userName = name;
    socket.join(roomId);

    if (!roomUsers.has(roomId)) roomUsers.set(roomId, new Map());
    const users = roomUsers.get(roomId)!;
    users.set(socket.id, name);

    io.to(roomId).emit('room-users', getRoomUsers(users));

    const currentCode = roomCode.get(roomId);
    if (typeof currentCode === 'string') socket.emit('code-update', currentCode);
  });

  socket.on('code-change', ({ roomId, code }: { roomId: string; code: string }) => {
    if (!roomId || typeof code !== 'string') return;
    roomCode.set(roomId, code);
    socket.to(roomId).emit('code-update', code);
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId as string | undefined;
    if (roomId && roomUsers.has(roomId)) {
      const users = roomUsers.get(roomId)!;
      users.delete(socket.id);

      if (users.size === 0) {
        roomUsers.delete(roomId);
        roomCode.delete(roomId);
      } else {
        io.to(roomId).emit('room-users', getRoomUsers(users));
      }
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = Number(process.env.PORT || 5000);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
