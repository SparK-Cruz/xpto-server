import { Auth } from './auth';
export declare class AuthService {
    create(username: string, password: string): Promise<Auth>;
    find(token: string): Promise<Auth>;
    touch(token: string): Promise<Date>;
    destroy(token: string): Promise<Auth>;
    private getExpiredTime();
}
