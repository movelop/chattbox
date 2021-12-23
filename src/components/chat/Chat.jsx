import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../infobar/InfoBar';
import Messages from '../messages/Messages';
import Input from '../input/Input';

import './chat.css';
import TextContainer from '../textcontainer/TextContainer';


let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://react-chattbox.herokuapp.com/'
    const location = window.location.search

    useEffect(() => {
        const { name, room } = queryString.parse(location); 

        socket = io(ENDPOINT, { transports : ['websocket'] });
        
        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, () => {
            
        } )

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
        
    }, [ENDPOINT, location]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          });

          socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [setMessage, setUsers]);

    const sendMessage = (e) => {
        e.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }
    
    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room = { room } />
                <Messages messages = { messages } name = { name } />
                <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat
