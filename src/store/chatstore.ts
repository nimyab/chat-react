import { makeAutoObservable, action } from "mobx";
import Chat from "../models/chat";
import axios from "../http/axios";
import User from "../models/user";
import Message from "../models/message";
import { createChatName } from "../utils/functions";

class ChatStore {

    chats: Chat[] = [];

    currentChat = {} as Chat;

    constructor() {
        makeAutoObservable(this);
    }

    addChat(chat: Chat) {
        const index = this.chats.findIndex(ch => ch.id === chat.id);
        if (index === -1) {
            this.chats = [...this.chats, chat];
        }
    }

    removeChat(id: number) {
        this.chats = this.chats.filter(chat => chat.id !== id);
    }

    selectChat(id: number) {
        if(!!this.currentChat){
            const index = this.chats.findIndex(ch => ch.id === this.currentChat.id);
            this.chats[index] = this.currentChat;
        }
        const index = this.chats.findIndex((chat) => chat.id === id);
        this.currentChat = new Chat(
            this.chats[index].title,
            this.chats[index].id,
            this.chats[index].messages,
            this.chats[index].users,
        );
    }

    setMessage(chatId: number, user: User, messageContent: string, messageId: number) {
        
        const message = new Message(messageId, chatId, user, messageContent);
        const newMessages = [...this.currentChat.messages, message]
        this.currentChat = new Chat(
            this.currentChat.title,
            this.currentChat.id,
            newMessages,
            this.currentChat.users
        )
    }

    async getChats(email: string) {
        const chats = await axios.getChats(email);
        
        if (chats) {
            chats.map(temp => {
                const chat = temp[0]
                const id = chat.id;

                const messages = chat.messages.map((message: any) =>
                    new Message(
                        message.id,
                        id,
                        new User(message.from.email, message.from.id, message.from.username),
                        message.content
                    )
                );
                const users = chat.users.map((user: any) => new User(user.email, user.id, user.username))
                const title = createChatName(users, email);
                const newChat = new Chat(title, id, messages, users);
                this.addChat(newChat);
            })
        }
    }

    async createChat(email: string) {
        axios.createChat(email)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.log(err))
    }
}

export default new ChatStore();