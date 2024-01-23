class User {
    email: string;
    nickname: string;
    id: number;

    constructor(email: string, id: number, nickname: string) {
        this.email = email;
        this.nickname = nickname;
        this.id = id;
    }
}

export default User;