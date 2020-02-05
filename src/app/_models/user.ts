import { Role } from "./role";

export class User {
    id: number;
    username: string;
    role: string;
    firstName: string;
    lastName: string;
    department: string;
    address: string;
    phone: string;
    password?: string;
    token?: string;
    active?: boolean;
    constructor() {}
}
