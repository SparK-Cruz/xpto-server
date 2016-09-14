export declare class Auth {
    userId: number;
    username: string;
    updatedAt: Date;
    token: string;
    constructor();
    private generateNewToken();
}
