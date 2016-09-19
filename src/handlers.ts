import * as restify from 'restify';
import { AuthService } from './auth/service';
import { Auth } from './auth/auth';

var authService = new AuthService();

export function normal(action: Function){
  return function(req: restify.Request, res: restify.Response, next: restify.Next): void{
    action(req, res);
    next();
  };
}
export function restrict(action: Function){
  return function(req: any, res: restify.Response, next: restify.Next): void{
    var authHeader = req.header('Authorization');
    if(typeof authHeader === 'undefined'){
      res.send(401, new Error('Authorization token not provided'));
      return next();
    }

    if(authHeader.indexOf('Token ') < 0){
      res.send(401, new Error('Login first'));
      return next();
    }

    var token = authHeader.replace('Token ', '');

    authService.find(token)
      .then((auth: Auth) => {
        req.token = token;
        req.userId = auth.userId;
        return next;
      })
      .then((next: restify.Next) => {
        authService.touch(token);
        action(req, res);
        return next();
      })
      .catch((fail: Error) => {
        res.send(401, fail);
        return next();
      });
  }
}
