import { Request, Response } from "express"
import PostgresDBController from "../../database/PostgresDBController.js"
import { LoginUserGateway } from "../../gateways/LoginUserGateway.js"
import { SendError } from "../../responses/SendError.js"
import { SendSuccess } from "../../responses/SendSuccess.js"
import { CompareStrings } from "../../utils/user_utils/functions/CryptUtils.js"
import { UserAdapter } from "../../utils/user_utils/classes/UserAdapter.js"
import { createWebToken } from "../../utils/user_utils/functions/WebtokenUtils.js"

/**
 * Controler responsible for logining to application
 */
class LoginUserController{
    private gateway:LoginUserGateway

    constructor(){
        this.gateway = new LoginUserGateway(PostgresDBController)
    }

    async requestLoginUser(req:Request,res:Response){
        const {
            username,
            password
        } = req.body

        const result = await this.loginUser(username,password);

        if(result) {
            res.status(200)
            res.end(new SendSuccess(result).stringify())
        }
        else {
            res.status(403)
            res.end(new SendError("Wrong password or username").stringify())
        }
    }
    
    /**
     * Gets user from database and compare password from database to one provided by client. 
     * If both username and password is correct, login is succesful.
     * @param username Username
     * @param password Password
     * @returns Webtoken for user that was logged in or false if password or username is not right.
     */
    private async loginUser(username:string, password:string):Promise<boolean|object>{
        const userAccount = await this.gateway.getUserByUsername(username)
        if(userAccount.length === 0) return false

        const userAdapter = new UserAdapter(userAccount[0])

        const arePassTheSame = await CompareStrings(password, userAdapter.password)
        
        const token = createWebToken(userAdapter.getPlaneUser(),process.env.SECRET_TOKEN,86400)
        const tokenRefresh = createWebToken(userAdapter.getPlaneUser(),process.env.SECRET_TOKEN_REFRESH,86400*60);

        //FIXME: może zwrócić object z jakieś klasy konkretnej
        if(arePassTheSame) return {token: token, tokenRefresh:tokenRefresh}
        else return false
    }
}

export default new LoginUserController()