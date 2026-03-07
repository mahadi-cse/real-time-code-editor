import logo from '../assets/logo/code_realtime.png'
import { v4 as uuid_v4 } from 'uuid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [userName, SettuserName] = useState('');
  interface CreateNewRoomEvent extends React.MouseEvent<HTMLAnchorElement, MouseEvent> {}
  interface HandleKeyUpEvent extends React.KeyboardEvent<HTMLInputElement> {}

  const createNewRoom = (e: CreateNewRoomEvent): void => {
    e.preventDefault();
    const id: string = uuid_v4();
    setRoomId(id);
    toast.success('Created a new room');
  }
  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error('Room ID & username is required');
      return;
    }
    // Redirect
    navigate(`editor/${roomId}`, {
      state: {
        userName,
      }
    });
  }

  const handlekeyup = (e: HandleKeyUpEvent): void => {
    if (e.key === 'Enter') {
      joinRoom();
    }
  }
  return (
    <>
      <div className="main-wrapper">
        <div className="form-wrapper">
          <img src={logo} alt="Code Realtime Logo" height={100} />
          <h4 className='mainLabel'>Paste your room ID</h4>
          <div className="input_group">
            <input
              type="text"
              className='inputBox'
              placeholder='Room ID'
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              onKeyUp={handlekeyup}
            /> <input
              type="text"
              className='inputBox'
              placeholder='Username'
              value={userName}
              onChange={e => SettuserName(e.target.value)}
              onKeyUp={handlekeyup}
            />
            <button className='btn join_btn' onClick={joinRoom}>Join</button>
            <span className='Create_Info'>If you have not any invitation then create &nbsp;
              <a onClick={createNewRoom} href="">New Room</a></span>
          </div>
        </div>
        <footer>Copyright &copy; by Mahadi since 2026 </footer>
      </div>
    </>
  )
}
