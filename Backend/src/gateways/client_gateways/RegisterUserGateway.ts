import { DatabaseAdapter } from "../../database/interfaces/DatabaseAdapternterface.js"

/**
 * Class responsible for all neccesary call to database to register user.
 */
export class RegisterUserGateway{
    

    constructor(private controller:DatabaseAdapter){}
    /**
     * Makes call to database to create user.
     * @param username Username
     * @param password Password
     * @param email Email
     * @returns Boolean informing whether user was created or not.
     */
    async createUser(username:string, password:string,email:string):Promise<boolean>{
        const result = await this.controller.insert("INSERT INTO users(username,password,email) VALUES(:username,:cryptedPassword,:email)" ,{username:username,cryptedPassword:password,email:email})
        return result
    }

    /**
     * Makes call to database checking if provided user exists.
     * @param username Username
     * @param email Email
     * @returns Boolean informing whether user exist or not.
     */
    async checkIfUserExist(username:string, email:string):Promise<boolean>{
        const result = await this.controller.select("SELECT * FROM users WHERE username = :username OR email = :email",{username:username,email:email})
        if(result.length > 0 ) return true
        else return false
    }
}