import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input, Button } from "@mui/material";
import userstore from "../store/userstore";
import { LOGIN_ROUTE } from "../utils/consts";

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    function registration() {
        userstore.registration(email, password, nickname);
        <Navigate to={LOGIN_ROUTE} replace/>;
    }

    return (
        <div>

            <Input value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
            <Input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
            <Input value={nickname} placeholder="nickname" onChange={e => setNickname(e.target.value)} />
            <Button onClick={registration}>Registration</Button>
        </div>
    );

}

export default Registration;