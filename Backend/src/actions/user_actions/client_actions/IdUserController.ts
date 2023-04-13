import { Request, Response } from "express";
import { SendError } from "../../../responses/SendError.js";
import { SendSuccess } from "../../../responses/SendSuccess.js";
import { verifyWebToken } from "../../../utils/user_utils/functions/WebtokenUtils.js";

class IdUserController{

    requestGetUserId(req:Request,res:Response) {
        const user = verifyWebToken(req.cookies.JWT,process.env.SECRET_TOKEN)

        if(user){
            res.status(200)
            res.end(new SendSuccess(user["id"]).stringify())
        }else{
            res.status(401)
            res.end(new SendError("Provided token isn't valid.").stringify())
        }
    }
}

export default new IdUserController()