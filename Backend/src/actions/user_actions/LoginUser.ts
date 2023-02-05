import { DatabaseControllerInterface } from "../../database/interfaces/DatabaseControllerInterface.js"
import { CompareStrings } from "../../utils/CryptUtils.js"

export class LoginUser{
    private controller:DatabaseControllerInterface

    constructor(controller:DatabaseControllerInterface){
        this.controller = controller
    }

    //TODO: później zmienić aby zwracał webtoken
    async loginUser(username:string, password:string):Promise<boolean>{
        const userAccount = await this.controller.select("SELECT * FROM users WHERE username = :username",{username:username})
        const arePassTheSame = await CompareStrings(password, userAccount[0]["password"])
        if(arePassTheSame) return true
        else return false
    }
}