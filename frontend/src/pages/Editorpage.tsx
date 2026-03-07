import React, { useState } from 'react'
import logo from '../assets/logo/code_realtime.png'
import { Clients } from '../components/Clients'
import { Editor } from '../components/Editor'

export const Editorpage = () => {
  const [clients, setClients] = useState([
    {
      socketid: '1234',
      userName: 'John Doe',
    },
    {
      socketid: '5678',
      userName: 'Jane Smith',
    },
    {
      socketid: '12340',
      userName: 'John Doe',
    },
    {
      socketid: '567800',
      userName: 'Jane Smith',
    }
  ])
  return (
    <>
      <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logo">
              <img src={logo} alt="" height={"60px"}/>
            </div>
            <h3>Conncted</h3>
            <div className="clientsList">
              {
                clients.map(client => (
                  <Clients
                    key={client.socketid}
                    userName={client.userName} />
                ))
              }
            </div>
          </div>
          <button className="btn copyBtn">
            Copy ROOM ID
          </button>
          <button className="btn leaveBtn">
            Leave
          </button>
        </div>
        <div className="editor-wrap" style={{ backgroundColor: '#000000' }}>
          <Editor />
        </div>
      </div>
    </>
  )
}
