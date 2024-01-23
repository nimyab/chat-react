import { observer } from "mobx-react-lite";
import React from "react";
import userstore from "../store/userstore";
import { Avatar, Box, dividerClasses } from "@mui/material";

const Profile = observer(() => {
    if(!userstore.user.nickname){
        return(
            <div style={{ textAlign: "center", padding: 10 }}>
                <h3>Загрузка...</h3>
            </div>
        )
    }
    return (
        <div style={{ textAlign: "center", padding: 10 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Avatar>{userstore.user.nickname.at(0)}</Avatar>
            </Box>
            <h4>nickname: {userstore.user.nickname}</h4>
            <h4>email : {userstore.user.email}</h4>
        </div>
    );
});

export default Profile;
