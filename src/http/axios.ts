import Axios from "axios";
import userstore from "../store/userstore";
import Chat from "../models/chat";
import User from "../models/user";

const axios = Axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000',
})

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

axios.interceptors.response.use(config => config, async (error) => {

    const originalReq = error.config;
    if (error.response.status === 401 && !error.config._isRetry) {
        error.config._isRetry = true;
        try {
            const tokens = await (await Axios.get('http://localhost:5000/auth/refresh', { withCredentials: true })).data
            localStorage.setItem('token', tokens.accessToken)
            originalReq.headers.Authorization = `Bearer ${tokens.accessToken}`;
            return axios(originalReq)
        } catch (error) {
            localStorage.removeItem('token');
            userstore.isAuth = false;
            console.log('no auth')
        }
    }

})

class HTTPAxios {

    async refresh() {
        try {
            const tokens = await (await Axios.get('http://localhost:5000/auth/refresh', { withCredentials: true })).data;
            localStorage.setItem('token', tokens.accessToken)
        } catch (error) {
            localStorage.removeItem('token');
            userstore.isAuth = false;
            console.log('no auth')
        }

    }

    async login(email: string, password: string) {
        const res = await axios.post('/auth/login', {
            email, password
        })
        return res;
    }

    async registration(email: string, password: string, username: string) {
        const res = await axios.post('/auth/registration', {
            email, password, username
        })
        return res.data;
    }

    async createChat(email: string) {
        const res = await axios.post('/chat/create', {
            user1: userstore.user.email,
            user2: email,
        })
        return res.data;
    }

    async getChats(email: string): Promise<any[]> {
        const res = await axios.get(`/chat/get/${email}`);
        return (!!res.data) ? res.data.chats : [];
    }

    async getUser() {
        try {
            const user = (await axios.get('/user/current')).data;
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        return await axios.post('/auth/logout');
        
    }
}

export default new HTTPAxios();

