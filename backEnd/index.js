import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import cors from "cors";


const app=express();
const server=createServer(app);
const io=new Server(server,{
    cors: {
        origin: "https://speakeasy-2.onrender.com", // Allow requests from your React app's origin
        methods: ["GET", "POST"]
      }
});
let users=[];

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello");
})

io.on("connection",(socket)=>{

console.log("connection created");

socket.on("joined",(currUser)=>{
users[socket.id]=currUser;
socket.broadcast.emit("user-joined",`${users[socket.id]} has joined the chat`);
socket.emit("welcome","WELCOME TO THE CHAT");
})

socket.on("message",(msg)=>{
    io.emit("msg",{message :msg,user:users[socket.id],id:socket.id});

})



socket.on("disconnect",()=>{
    socket.broadcast.emit("leave",`${users[socket.id]} disconnected`);   
})





})








server.listen(3000,()=>{

console.log("listen");


})