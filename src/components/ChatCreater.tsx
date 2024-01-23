import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import chatstore from "../store/chatstore";
import { CHAT_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";
import { Input, Button } from '@mui/material';
import { socket } from "../socket/socket";
import userstore from "../store/userstore";

const ChatCreater = () => {

    const [email, setEmail] = useState('');

    function createNewChat() {
        socket.emit('createChat',{
            users: [email, userstore.user.email],
        })
        setEmail('')
    }

    return (
        <div>
            Выберете чат или создайте его
            <div>
                <Input onChange={e => setEmail(e.target.value)} value={email} placeholder="friend email"/>
                <Button onClick={e => createNewChat()}>Создать</Button>
            </div>
        </div>
    )
}

export default ChatCreater