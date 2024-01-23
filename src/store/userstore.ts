import { makeAutoObservable } from "mobx";
import User from "../models/user";
import axios from "../http/axios";
import chatstore from "./chatstore";
import { socket } from "../socket/socket";

class UserStore {

    user: User = {} as User;
    isAuth = (!!localStorage.getItem('token') !== false ? true : false);


    constructor() {
        makeAutoObservable(this);
    }

    async login(email: string, password: string) {
        await axios.login(email, password)
            .then(res => {
                this.user = new User(res?.data.email, res?.data.id, res?.data.username);
                localStorage.setItem('token', res?.data.accessToken)
                this.isAuth = true;
                this.getUser();
                
                console.log(res?.data, this.isAuth);
            })
            .catch(err => console.log(err))
    }

    async registration(email: string, password: string, username: string) {
        await axios.registration(email, password, username)
            .then(res => {
                console.log(res?.data)
            })
            .catch(err => console.log(err))
    }

    async logout() {
        axios.logout()
            .then((res) => {
                localStorage.removeItem('token');
                this.isAuth = false;
                console.log(res.data, this.isAuth);
                socket.disconnect();
            })
            .catch(err => console.log(err))
    }

    async getUser() {
        const userData = await axios.getUser();
        if (userData) {
            this.user = new User(userData.email, userData.id, userData.username);
            socket.connect();
            socket.auth = { ...this.user }
        }
    }



}

export default new UserStore();