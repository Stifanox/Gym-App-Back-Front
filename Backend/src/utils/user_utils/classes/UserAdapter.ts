export class UserAdapter{
    id:number
    username:string
    password:string
    email:string

    constructor(user:object){
        this.id = user["id"] || 0
        this.username = user["username"] || ""
        this.password = user["password"] || ""
        this.email = user["email"] || ""
    }

    getPlaneUser():object{
        const userSanitized:object = {
            id:this.id,
            username:this.username,
            email:this.email
        }

        return userSanitized
    }
}