# Real-Time Code Editor

A fully functional collaborative code editor where multiple users can edit code simultaneously in shared rooms with **instant synchronization** powered by WebSockets.

> ✅ **Status:** Full-stack implementation complete with real-time Socket.IO communication between client and server.

## Project Status

- ✅ Backend server with Node.js + Express + Socket.IO is fully implemented
- ✅ Frontend app with React + TypeScript + Vite is functional
- ✅ Real-time code synchronization with WebSocket integration
- ✅ Room management (create, join, disconnect)
- ✅ Connected users presence and avatars
- ✅ Live code editor with CodeMirror integration

## Repository Structure

```text
real-time-code-editor/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Clients.tsx         # Connected users display
│   │   │   └── Editor.tsx          # CodeMirror editor with realtime sync
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Room creation/joining
│   │   │   └── Editorpage.tsx      # Main editor page with socket connection
│   │   ├── App.tsx                 # Router setup
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── server/                          # Node.js backend server
    ├── server.ts                    # Socket.IO server with room/code management
    ├── package.json
    └── tsconfig.json
```

## Features

### Backend (Node.js + Socket.IO)

- **Room Management:** Users can join unique rooms identified by UUID
- **Code Persistence:** Current code state is maintained per room and sent to new joiners
- **Real-time Broadcasting:** Code changes instantly broadcast to all users in a room
- **User Presence:** Track connected users and their socket/username information
- **Auto-cleanup:** Empty rooms and associated code are automatically cleaned up
- **CORS Enabled:** Accepts connections from any frontend origin

### Frontend (React + TypeScript)

#### 1) Home Page (`/`)

- Create new room with auto-generated UUID
- Join existing room with custom username
- Session persistence (room ID and username stored in sessionStorage)
- Real-time toast notifications for user feedback

#### 2) Editor Page (`/editor/:id`)

- **Live Code Editor:** CodeMirror-based editor with JavaScript syntax highlighting
- **Real-time Sync:** Code changes instantly appear to all connected users
- **Connected Users Panel:** Avatar + username display for all participants
- **Room Sharing:** Copy room ID button for easy collaboration invites
- **Dark Theme:** Comfortable One Dark theme for extended coding sessions
- **Auto-recovery:** New users receive current code state on join

## Tech Stack

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite 7
- **Routing:** React Router DOM
- **Code Editor:** CodeMirror 6 with JavaScript support
- **Notifications:** react-hot-toast
- **Avatar UI:** react-avatar
- **Utilities:** uuid
- **Linting:** ESLint + typescript-eslint
- **Styling:** CSS

### Backend
- **Runtime:** Node.js (TypeScript)
- **Framework:** Express.js
- **Real-time:** Socket.IO
- **Port:** 5000 (default)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm (comes with Node)

### Installation & Setup

#### 1. Setup Backend Server

```bash
cd server
npm install
```

#### 2. Setup Frontend Client

```bash
cd client
npm install
```

### Run Both in Development

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run dev
# Vite dev server runs on http://localhost:5173
```

Then open `http://localhost:5173` in your browser.

### Frontend Scripts

Inside `client/package.json`:

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript build + Vite production build
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint checks

### Backend Scripts

Inside `server/package.json`:

- `npm start` — run server with ts-node

## How Real-Time Sync Works

1. **User types** → CodeMirror editor detects change
2. **Change emitted** → Socket.IO sends `code-change` event to server
3. **Server updates** → Saves latest code and broadcasts via `socket.to(roomId)`
4. **Others receive** → `code-update` listener updates their editor
5. **No echo** → Flag prevents re-broadcasting to sender

## Environment Variables

### Frontend (`client/`)
- `VITE_SOCKET_URL` — Backend server URL (defaults to `http://localhost:5000`)

### Backend (`server/`)
- `PORT` — Server listening port (defaults to `5000`)

## Deployment

### Frontend
```bash
cd client
npm run build
# Output: dist/ folder ready for hosting (Vercel, Netlify, etc.)
```

### Backend
Deploy `server/` to a Node.js hosting platform (Heroku, Railway, AWS, etc.) and set:
- `PORT` environment variable
- Update `VITE_SOCKET_URL` in frontend to point to deployed backend

## Testing the App

1. Open two browser tabs or windows to `http://localhost:5173`
2. Create a new room on tab 1
3. Copy the room ID and paste into tab 2
4. Type in the editor on either tab — changes appear instantly on the other
5. Connected users list updates in real-time
