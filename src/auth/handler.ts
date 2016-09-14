import * as restify from 'restify';
import { AuthService } from './service';
import { Auth } from './auth';

var service = new AuthService();

export class AuthHandler {
  public create(req: any, res: restify.Response): void{
    service.create(req.body.username, req.body.password)
      .then((auth: Auth) => {
        res.send(201, {auth: auth});
      })
      .catch((fail: Error) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public noop(req: any, res: restify.Response): void{
    service.touch(req.token)
      .then((update: Date) => {
        res.send(200, {noop:update});
      })
      .catch((fail: Error) => {
        console.error(fail);
        res.send(400, fail);
      });
  }

  public destroy(req: any, res: restify.Response): void{
    service.destroy(req.token)
      .then((auth: Auth) => {
        res.send(200, {auth: auth});
      })
      .catch((fail: Error) => {
        console.error(fail);
        res.send(400, fail);
      });
  }
}