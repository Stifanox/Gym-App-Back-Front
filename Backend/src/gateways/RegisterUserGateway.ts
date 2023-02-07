import { DatabaseAdapterInterface } from "../database/interfaces/DatabaseAdapternterface.js"

/**
 * Class responsible for all neccesary call to database to register user.
 */
export class RegisterUserGateway{
    private controller:DatabaseAdapterInterface

    constructor(controller:DatabaseAdapterInterface){
        this.controller = controller
    }

    async createUser(username:string, password:string,email:string):Promise<boolean>{
        const result = await this.controller.insert("INSERT INTO users(username,password,email) VALUES(:username,:cryptedPassword,:email)" ,{username:username,cryptedPassword:password,email:email})
        return result
    }

    async checkIfUserExist(username:string, email:string):Promise<boolean>{
        const result = await this.controller.select("SELECT * FROM users WHERE username = :username OR email = :email",{username:username,email:email})
        if(result.length > 0 ) return true
        else return false
    }
}