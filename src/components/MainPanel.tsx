import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import userstore from "../store/userstore";
import { LOGIN_ROUTE } from "../utils/consts";
import Profile from "./Profile";
import Chats from "./Chats";
import Chat from "./Chat";
import ChatCreater from "./ChatCreater";
import "../app.css";
import chatstore from "../store/chatstore";
import { socket } from "../socket/socket";
import ChatModel from "../models/chat";
import User from "../models/user";
import { createChatName } from "../utils/functions";

const MainPanel = observer(() => {

    

    const { id } = useParams();
    
    useEffect(() => {
        if(userstore.user.email)
            chatstore.getChats(userstore.user.email);
        

        return () => {
            chatstore.chats = [];
        };
    }, [userstore.user.email]);

    useEffect(() => {
        socket.on("newMessage", (payload: { message: any }) => {
            const { message } = payload;
            const chatId = message.chat.id;
            const from = new User(
                message.from.email,
                message.from.id,
                message.from.username
            );
            const content = message.content;
            const messageId = message.id;
            chatstore.setMessage(chatId, from, content, messageId);
        });

        socket.on("createChat", (payload: any) => {
            const { users, id } = payload.chat;
            const newUsers: User[] = users.map(
                (user: any) => new User(user.email, user.id, user.username)
            );
            console.log(newUsers);
            chatstore.addChat({
                id,
                users: newUsers,
                title: createChatName(newUsers, userstore.user.email),
            } as ChatModel);
        });

        return () => {
            socket.off("newMessage");
            socket.off("createChat");
        };
    }, [id]);

    return (
        <div>
            <div>
                {!userstore.isAuth ? (
                    <Navigate to={"/" + LOGIN_ROUTE} replace />
                ) : (
                    <div>
                        <div className="left-panel">
                            <Profile />
                        </div>

                        <div className="middle-panel">
                            <Chats />
                        </div>

                        <div className="right-panel">
                            {!!id ? <Chat /> : <ChatCreater />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

export default MainPanel;
