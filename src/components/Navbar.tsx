import { observer } from "mobx-react-lite";
import React from "react";
import userstore from "../store/userstore";
import { AppBar, Toolbar, Button, ButtonGroup, Box } from '@mui/material'
import { Link, Navigate, Outlet } from "react-router-dom";
import { CHAT_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE } from "../utils/consts";


const Navbar = observer(() => {
    return (
        <>
            <header>
                {!userstore.isAuth ?
                    <AppBar position='static' >
                        <Toolbar >
                            <ButtonGroup variant="contained" aria-label="outlined primary button group" color='info'>
                                <Button ><Link to={'/' + REGISTRATION_ROUTE}>Регистрация</Link></Button>
                                <Button ><Link to={'/' + LOGIN_ROUTE}>Вход</Link></Button>
                            </ButtonGroup>
                        </Toolbar>

                    </AppBar>
                    :
                    <AppBar position='static'>
                        <Toolbar >
                            <ButtonGroup variant="contained" aria-label="outlined primary button group" color='info'>
                                <Button onClick={() => {
                                    userstore.logout()
                                }}
                                >Выход</Button>
                                <Button ><Link to={'/' + CHAT_ROUTE}>Чаты</Link></Button>
                            </ButtonGroup>
                        </Toolbar>

                    </AppBar>
                }
            </header>
            <main>
                <Outlet />
            </main>


        </>
    )
})

export default Navbar