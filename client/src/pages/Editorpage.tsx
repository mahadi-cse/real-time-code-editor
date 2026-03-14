import { useEffect, useMemo, useState } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import logo from '../assets/logo/code_realtime.png'
import { Clients } from '../components/Clients'
import { Editor } from '../components/Editor'

type RoomClient = {
  socketId: string
  userName: string
}

const SOCKET_URL = (import.meta.env.VITE_SOCKET_URL as string | undefined) || 'http://localhost:5000'

export const Editorpage = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [clients, setClients] = useState<RoomClient[]>([])
  const { id: roomId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const effectiveRoomId = useMemo(
    () => roomId || sessionStorage.getItem('rtce:roomId') || '',
    [roomId]
  )

  const userName = useMemo(() => {
    const fromState = (location.state as { userName?: string } | null)?.userName
    return (fromState || sessionStorage.getItem('rtce:userName') || '').trim()
  }, [location.state])

  useEffect(() => {
    if (!effectiveRoomId || !userName) {
      toast.error('Room ID and username are required')
      navigate('/')
      return
    }

    const nextSocket = io(SOCKET_URL)
    setSocket(nextSocket)
    nextSocket.emit('join-room', { roomId: effectiveRoomId, userName })
    nextSocket.on('room-users', setClients)

    return () => {
      nextSocket.off('room-users', setClients)
      nextSocket.disconnect()
      setSocket(null)
    }
  }, [effectiveRoomId, navigate, userName])

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(effectiveRoomId)
    toast.success('Room ID copied')
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src={logo} alt="Code Realtime Logo" height={60} />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map(client => (
              <Clients key={client.socketId} userName={client.userName} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>Copy ROOM ID</button>
        <button className="btn leaveBtn" onClick={() => navigate('/')}>Leave</button>
      </div>
      <div className="editor-wrap">
        <Editor socket={socket} roomId={effectiveRoomId} />
      </div>
    </div>
  )
}
