import User from "../models/user";

export function createChatName(users: User[], email: string) {
    if (users[0].email === email) {
        return users[1].nickname;
    }
    return users[0].nickname;
}
