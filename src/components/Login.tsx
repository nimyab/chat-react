import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import userstore from "../store/userstore";
import { Navigate } from "react-router-dom";
import { CHAT_ROUTE } from "../utils/consts";



const Login = observer(() => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function tryLogin() {
        userstore.login(email, password);

    }

    return (
        <div>
            {
                userstore.isAuth
                    ?
                    <Navigate to={'/' + CHAT_ROUTE} replace />
                    :
                    <div>
                        <Input value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
                        <Input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
                        <Button onClick={tryLogin}>login</Button>
                    </div>
            }

        </div>
    );
});

export default Login;