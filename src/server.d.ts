import * as restify from 'restify';
import { UserHandler } from './users/handler';
export declare class Server {
    private srv;
    private _auth;
    private _customer;
    private _user;
    constructor(server: restify.Server);
    bindAuth(prefix: string): void;
    bindUser(prefix: string): UserHandler;
    bindCustomer(prefix: string): void;
}
