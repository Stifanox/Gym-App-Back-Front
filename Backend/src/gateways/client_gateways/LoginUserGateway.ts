import { DatabaseAdapter } from "../../database/interfaces/DatabaseAdapternterface.js";

/**
 * Class responsible for all neccesary calls to database to login.
 */
export class LoginUserGateway {

    constructor(private controller:DatabaseAdapter){}

    async getUserByUsername(username:string):Promise<object[]>{
        const userAccount = await this.controller.select("SELECT * FROM users WHERE username = :username",{username:username})
        return userAccount
    }
    setRefreshTokenById(id:number,refreshToken:string){
        this.controller.update("UPDATE users SET refresh_token = :refreshToken WHERE id = :id",{refreshToken:refreshToken,id:id})
    }
}