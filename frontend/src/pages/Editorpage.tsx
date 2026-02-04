import React, { useState } from 'react'
import logo from '../assets/logo/code_realtime.png'
import { Clients } from '../components/Clients'

export const Editorpage = () => {
  const [clients,setClients] = useState([
    {
      socketid: '1234',
      userName: 'John Doe',
    },
    {
      socketid: '5678',
      userName: 'Jane Smith',
    }
  ])
  return (
    <>
      <div className="mainWrap">
        <div className="aside">
            <div className="asideInner">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <h3>Conncted</h3>
                <div className="clientsList">
                  {
                    clients.map(client => (
                      <Clients 
                        key={client.socketid} 
                        userName={client.userName}/>
                    ))
                  }
                </div>
            </div>
        </div>
      </div>
      <div className="editor-wrap">

      </div>
    </>
  )
}
