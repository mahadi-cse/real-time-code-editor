import React from 'react'
import Avatar from 'react-avatar';
type Clientprops = {
    userName: string;
}

export const Clients = ({userName} : Clientprops) => {
  return (
    <>
        <div className="client">
            <Avatar name={userName} size="25" round="10px" color='#07bdc4'/>
            <span className='userName'>{userName}</span>
        </div>
    </>
  )
}
