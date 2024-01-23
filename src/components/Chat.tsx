import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import chatstore from "../store/chatstore";
import userstore from "../store/userstore";
import { Input, Button, Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import { CHAT_ROUTE } from "../utils/consts";
import { socket } from "../socket/socket";
import MessageInputBlock from "./MessageInputBlock";

const Chat = observer(() => {
    const [message, setMessage] = useState("");

    function createMessage() {
        if (message !== "") {
            socket.emit("newMessage", {
                userId: userstore.user.id,
                content: message,
                chatId: chatstore.currentChat.id,
            });
            setMessage("");
        }
    }

    if (!chatstore.currentChat.id) {
        return <Navigate to={"/" + CHAT_ROUTE} />;
    }

    return (
        <div>
            <div className="chat">
                
                {chatstore.currentChat.messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            margin: 10,
                            border:
                                userstore.user.id === message.from.id
                                    ? "2px solid green"
                                    : "2px solid red",
                            marginLeft:
                                userstore.user.id === message.from.id
                                    ? "auto"
                                    : "10px",
                            width: "fit-content",
                            padding: 5,
                        }}
                    >
                        <Grid container>
                            <div>{message.from.nickname}</div>
                        </Grid>
                        <div>{message.content}</div>
                    </div>
                ))}
            </div>
            <div className="input">
                <Input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    fullWidth
                />
                <Button onClick={() => createMessage()}>Отправить</Button>
            </div>
        </div>
    );
});

export default Chat;
