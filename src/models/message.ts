import User from "./user";

class Message {
    from: User;
    content: string;
    chatId: number;
    id: number;

    constructor(id: number, chatId: number, from: User, content: string) {
        this.from = from;
        this.content = content;
        this.chatId = chatId;
        this.id = id;
    }
}

export default Message
