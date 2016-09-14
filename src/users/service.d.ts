import { User } from './user';
export declare class UserService {
    authenticate(username: string, password: string): Promise<User>;
    find(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    private encryptPassword(username, password);
}
