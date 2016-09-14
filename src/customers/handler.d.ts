import * as restify from 'restify';
export declare class CustomerHandler {
    create(req: any, res: restify.Response): void;
    search(req: any, res: restify.Response): void;
    list(req: any, res: restify.Response): void;
    get(req: any, res: restify.Response): void;
    update(req: any, res: restify.Response): void;
    destroy(req: any, res: restify.Response): void;
}
