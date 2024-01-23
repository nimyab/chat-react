import React from "react";
import userstore from "../store/userstore";
import { Navigate } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const Redirect = observer(() => {
    return (
        <div>
            {!userstore.isAuth ? (
                <Navigate to={"/" + LOGIN_ROUTE} />
            ) : (
                <Navigate to={"/" + CHAT_ROUTE} />
            )}
        </div>
    );
});

export default Redirect;
