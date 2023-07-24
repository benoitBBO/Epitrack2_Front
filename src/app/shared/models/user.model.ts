export class UserModel {
    id!: number;
    userName!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;

    constructor(user: any) {
        this.id = user.id;
        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }
}

