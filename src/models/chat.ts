import Message from "./message";
import User from "./user";

class Chat {
    title: string;
    id: number;
    messages: Message[];
    users: User[];

    constructor(title: string, id: number, messages: Message[] = [], users: User[] = []) {
        this.title = title;
        this.id = id;
        this.messages = messages;
        this.users = users;
    }
}

export default Chat;