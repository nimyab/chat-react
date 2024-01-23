import React, { useEffect } from "react";
import userstore from "./store/userstore";
import { Routes, Route, Link } from "react-router-dom";
import {
    CHAT_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    REGISTRATION_ROUTE,
} from "./utils/consts";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar";
import Redirect from "./components/Redirect";
import MainPanel from "./components/MainPanel";
import axios from "./http/axios";

const App = () => {
    useEffect(() => {
        userstore.getUser();
        
        setInterval(() => {
            axios.refresh();
        }, 1000 * 60 * 10); //10 min
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Redirect />} />
                    <Route path={LOGIN_ROUTE} element={<Login />} />
                    <Route path={CHAT_ROUTE} element={<MainPanel />} />
                    <Route path={CHAT_ROUTE + "/:id"} element={<MainPanel />} />
                    <Route
                        path={REGISTRATION_ROUTE}
                        element={<Registration />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
