import React from 'react'
import "./messages.css";

function Messages({message,user,position}) {
  return (
    <div className={` msg ${position}`} >
       {`${user} : ${message}`}
    </div>
  )
}

export default Messages;
