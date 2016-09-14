import * as Sequelize from 'sequelize';
import * as db from '../connection';

export class User {
  public id: number;
  public username: string;
  public password: string;
}

export module User{
  export var Dao = db.get().define('users', {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: Sequelize.STRING
  });
}