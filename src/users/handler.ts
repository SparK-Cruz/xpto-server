import * as restify from 'restify';
import { UserService } from './service';
import { User } from './user';

var service = new UserService();

class Decorator {
  public id: number;
  public username: string;

  constructor(user: User){
    this.id = user.id;
    this.username = user.username;
  }
}

export class UserHandler {
  public get(req: any, res: restify.Response): void{
    service.find(req.params.id)
      .then((user: User) => {
        if (user === null) {
          res.send(404, "Not found");
          return;
        }

        res.send(200, {user: new Decorator(user)});
      })
      .catch((fail: Error) => {
        console.error(fail);
        res.send(400, fail);
      });
  }
}