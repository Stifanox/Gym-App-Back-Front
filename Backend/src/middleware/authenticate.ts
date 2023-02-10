import { NextFunction, Request, Response } from "express";
import { SendError } from "../responses/SendError.js";
import { verifyWebToken } from "../utils/user_utils/functions/WebtokenUtils.js";

//TODO: zapytać klimka jak to zrobić mądrze
/**
 * Middleware to verify whether client is logged in ot not.
 */
export async function authenticate(req:Request,res:Response,next:NextFunction){
    const token = req.cookies.JWT

    if(token === undefined){
        res.status(401)
        res.end(new SendError("Token was not provided by client").stringify())
        return
    }
    const userVerication = verifyWebToken(token,process.env.SECRET_TOKEN)

    if(userVerication === false){
        res.status(403)
        res.end(new SendError("Token was expired, login to application").stringify())
        return
    }
    next()
}