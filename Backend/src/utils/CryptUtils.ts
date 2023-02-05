import bcrypt from "bcrypt"

export function CryptString(text:string):Promise<string>{
    return new Promise((resolve,reject)=>{
        const salt = 10
        bcrypt.hash(text,salt,(err,hash)=>{
            if(err) reject(err.message)
            else resolve(hash)
        })
    })
}

export function CompareStrings(text:string,encrypted:string):Promise<boolean>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(text,encrypted,(err,same)=>{
            if(err) reject(err.message)
            else resolve(same)
        })
    })
}