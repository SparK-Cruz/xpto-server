let sha1 = require('sha1');

import { User } from './user';

export class UserService {
  public authenticate(username: string, password: string): Promise<User>{
    var self = this;
    return this.findByUsername(username)
      .then((user: User) => {
        if (user === null || user.password !== self.encryptPassword(username, password))
          throw {message: 'Invalid user and/or password!'};
        return user;
      });
  }

  public find(id: number): Promise<User>{
    return User.Dao.findOne({
      where: {
        id: id
      }
    });
  };
  public findByUsername(username: string): Promise<User>{
    return User.Dao.findOne({
      where: {
        username: username
      }
    });
  };

  private encryptPassword(username: string, password: string): string{
    return sha1('add XPTO salt for '+username+' to enter their '+password+' safe');
  }
}
