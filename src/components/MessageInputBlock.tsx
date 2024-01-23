import { Input, Button } from "@mui/material";
import React, { useState } from "react";

const MessageInputBlock = (createMessage: any) => {
    console.log(createMessage)
    const [message, setMessage] = useState("");

    function create() {
        createMessage(message, setMessage);
    }

    return (
        <div>
            <Input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                fullWidth
            />
            <Button onClick={(e) => create()}>
                Отправить
            </Button>
        </div>
    );
};

export default MessageInputBlock;
