import React, { useEffect, useState } from 'react'
import { currUser } from './join';
import { useMemo } from "react";
import { io } from "socket.io-client";
import "./user.css";
import Messages from './messages';
import ReactScrollToBottom from "react-scroll-to-bottom";


function User() {
    let [message, setMessage] = useState("");
    let [messages,setMessages]=useState([]);
    let [id,setId]=useState("");

    const socket = useMemo(() => io("http://localhost:3000/"), []);

    useEffect(() => {

        socket.on("connect", () => {
            console.log("connected");
            setId(socket.id);

            socket.emit("joined", currUser);
            socket.on("welcome", (greet) => {
                console.log(greet);

            })
            socket.on("user-joined", (data) => {
                console.log(data);
            })
            socket.on("leave", (data) => {
                console.log(data);
            })

            socket.on("msg", (data) => {
                setMessages((prevMessages)=>[...prevMessages,data])
                console.log(data.user + " " + data.message);
            })


            return () => {
                socket.emit("disconnect");
                socket.off();

            }



        })


    }, []);


    function inputHandler(event) {
        setMessage(event.target.value);
    }
    function btnHandler() {
        socket.emit("message", message);
        setMessage("");
    }
    function keyPressing(event){
if(event.key=="Enter"){
    btnHandler();
}

    }







    return (
        <div className="chatPage">
            <div className="chatContainer">

                <div className="header">
                    <h4>SpeakEasy</h4>
                </div>
                <ReactScrollToBottom className="chatBox">
             
{
                messages.map((item,i)=>(
                    <Messages  key={i}message={item.message} user={item.id===id?"You":item.user} position={item.id===id?"right":"left"} />



                ))




}
                    
                        

                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="input" onChange={inputHandler} value={message} onKeyDown={keyPressing}/>
                    <button id="btn" onClick={btnHandler}>Send</button>
                </div>

            </div>


        </div>
    )
}

export default User;