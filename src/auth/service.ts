import { Auth } from './auth';
import { User } from '../users/user';
import { UserService } from '../users/service';

import * as config from '../config';

var authStorage: any = {};
var userService = new UserService();

export class AuthService {
  public create(username: string, password: string): Promise<Auth>{
    var self = this;
    return userService.authenticate(username, password)
      .then((user: User) => {
        for(var key in authStorage){
          var current = authStorage[key];

          if(current.updatedAt < self.getExpiredTime()){
            delete authStorage[current.token];
            continue;
          }

          if(current.username == username){
            delete authStorage[current.token];
          }
        }

        var auth = new Auth();
        auth.userId = user.id;
        auth.username = user.username;

        authStorage[auth.token] = auth;
        return auth;
      });
  }

  public find(token: string): Promise<Auth>{
    var self = this;
    return Promise.resolve().then(function(){
      var sessionModel = authStorage[token];
      if(sessionModel == null)
        throw {message: "Invalid auth token!"};

      if(sessionModel.updatedAt < self.getExpiredTime()){
        delete authStorage[token];
        throw {message: "Invalid auth token!"};
      }

      return sessionModel;
    });
  };

  public touch(token: string): Promise<Date>{
    var self = this;
    return Promise.resolve().then(() => {
      return authStorage[token].updatedAt = new Date();
    });
  };

  public destroy(token: string): Promise<Auth>{
    var session = authStorage[token];
    delete authStorage[token];
    return Promise.resolve(session);
  };


  //private
  private getExpiredTime(): Date{
    var expiredTimeAgo = new Date();

    expiredTimeAgo.setMinutes(
      expiredTimeAgo.getMinutes()
      - config.expireSessionMinutes
    );

    return expiredTimeAgo;
  }
}