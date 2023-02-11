import { CryptString } from "../../../utils/user_utils/functions/CryptUtils.js";
import { RegisterUserGateway } from "../../../gateways/client_gateways/RegisterUserGateway.js";
import { SendSuccess } from "../../../responses/SendSuccess.js";
import { SendError } from "../../../responses/SendError.js";
import { Request,Response } from "express";
import PostgresDBController from "../../../database/PostgresDBController.js";

//TODO: dodać gateway ale jakoś dynamicznie nie?
/**
 * Controller responsible for registering user.
 */
class RegisterUserController {
    private gateway:RegisterUserGateway

    constructor(){
        this.gateway = new RegisterUserGateway(PostgresDBController)
    }
    
    async requestRegisterUser(req:Request,res:Response){
        const {
            password,
            username,
            email
        } = req.body

        const result = await this.registerUser(username,password,email)
        res.status(200)

        if(result) res.end(new SendSuccess("Register was successful").stringify())
        else res.end(new SendError("User already exist").stringify())
    }

    /**
     * Creates user in database.
     * @param username Username
     * @param password Password
     * @param email Email
     * @returns Boolean which indicates whether user was added or not.
     */
    private async registerUser(username:string,password:string,email:string):Promise<boolean>{
        const cryptedPassword = await CryptString(password);
        if (await this.checkIfUserExist(username,email)) return false

        const result = await this.gateway.createUser(username,cryptedPassword,email)
        return result
    }

    /**
     * Checks if user with passed username or email exists.
     * @param username Username
     * @param email Email
     * @returns Boolean which indicates whether user exists or not.
     */
    private async checkIfUserExist(username: string, email: string): Promise<boolean> {
        const result = await this.gateway.checkIfUserExist(username,email)
        return result
    }

}

export default new RegisterUserController()
