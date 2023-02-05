export interface RegisterInterface{
    registerUser(username:string,password:string,email:string):Promise<boolean>
}