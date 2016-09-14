import * as restify from 'restify';
export declare function normal(action: Function): (req: restify.Request, res: restify.Response, next: restify.Next) => void;
export declare function restrict(action: Function): (req: any, res: restify.Response, next: restify.Next) => void;
