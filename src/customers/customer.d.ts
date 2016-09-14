import * as Sequelize from 'sequelize';
export declare class Customer {
    id: number;
    name: string;
    birth: Date;
    federalId: string;
    email: string;
    phone: string;
    enabled: boolean;
}
export declare module Customer {
    var Dao: Sequelize.Model<{}, {}>;
}
