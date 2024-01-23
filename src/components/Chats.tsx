import { observer } from "mobx-react-lite";
import React from "react";
import chatstore from "../store/chatstore";
import { CHAT_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';

const Chats = observer(() => {

    return (
        <div>
            {
                chatstore.chats.map((chat) =>
                    <Link key={chat.id} to={'/' + CHAT_ROUTE + `/${chat.id}`}>
                        <Box
                            textAlign='center'
                            height={30}
                            margin={1}
                        >
                            <Button onClick={e => chatstore.selectChat(chat.id)}><div>{chat.title}</div></Button>
                        </Box>
                    </Link>
                )
            }
        </div>
    )
});

export default Chats