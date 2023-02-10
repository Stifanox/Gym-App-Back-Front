import jwt from "jsonwebtoken"

/**
 * Creates JSON Web Token from data provided.
 * @param data Any object that we what to use as a payload.
 * @param expiresIn Time described in seconds. Default value is 86400 which is equivalent to one day.
 * @returns Webtoken string
 */
export function createWebToken(data:object,secret:string,expiresIn:number = 86400):string{
    const token = jwt.sign(data,secret,{expiresIn:expiresIn})

    return token
}

/**
 * Verify token provided by client.
 * @param token Client token to verify
 * @param secret Secret to decrypt token
 * @returns Decoded object or false if token was invalid.
 */
export function verifyWebToken(token:string, secret:string):jwt.JwtPayload|boolean{
    try{
        const userDecoded = jwt.verify(token,secret)
        return (userDecoded as jwt.JwtPayload)
    }catch(err){
        return false
    }
}