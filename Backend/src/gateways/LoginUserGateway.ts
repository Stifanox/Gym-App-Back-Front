import { DatabaseAdapterInterface } from "../database/interfaces/DatabaseAdapternterface.js";

/**
 * Class responsible for all neccesary calls to database to login.
 */
export class LoginUserGateway {
    private controller: DatabaseAdapterInterface;

    constructor(controller:DatabaseAdapterInterface){
        this.controller = controller
    }

    async getUserByUsername(username:string):Promise<object[]>{
        const userAccount = await this.controller.select("SELECT * FROM users WHERE username = :username",{username:username})
        return userAccount
    }
}