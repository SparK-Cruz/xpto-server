import * as Sequelize from 'sequelize';
export declare class User {
    id: number;
    username: string;
    password: string;
}
export declare module User {
    var Dao: Sequelize.Model<{}, {}>;
}
