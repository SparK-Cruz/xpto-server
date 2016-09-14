import * as Sequelize from 'sequelize';
import * as db from '../connection';

export class Customer{
  id: number;
  name: string;
  birth: Date;
  federalId: string;
  email: string;
  phone: string;
  enabled: boolean;
}

export module Customer{
  export var Dao = db.get().define('customers', {
    name: Sequelize.STRING,
    birth: Sequelize.TIME,
    federalId: {
      type: Sequelize.STRING(11),
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    phone: Sequelize.STRING,
    enabled: Sequelize.BOOLEAN
  });
}