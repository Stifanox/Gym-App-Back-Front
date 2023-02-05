import { CryptString } from "../../utils/CryptUtils.js";
import { DatabaseControllerInterface } from "../../database/interfaces/DatabaseControllerInterface.js";
import { RegisterInterface } from "../../database/interfaces/RegisterInterface.js";

export class RegisterUserController implements RegisterInterface{
    private controller:DatabaseControllerInterface

    constructor(controller:DatabaseControllerInterface){
        this.controller = controller
    }
    

    async registerUser(username:string,password:string,email:string):Promise<boolean>{
        const cryptedPassword = await CryptString(password);
        if (await this.checkIfUserExist(username,email)) return false

        const result = await this.controller.insert("INSERT INTO users(username,password,email) VALUES(:username,:cryptedPassword,:email)" ,{username:username,cryptedPassword:cryptedPassword,email:email})
        return result
    }

    private async checkIfUserExist(username: string, email: string): Promise<boolean> {
        const result = await this.controller.select("SELECT * FROM users WHERE username = :username OR email = :email",{username:username,email:email})
        if(result.length > 0 ) return true
        else false
    }

}

