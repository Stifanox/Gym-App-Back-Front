import { SendInterface } from "./SendInterface.js";

export class SendSuccess implements SendInterface{
    status: string;
    data: string;
    
    constructor(data:string){
        this.status = "Success"
        this.data = data
    }

    stringify(): string {
        return JSON.stringify(this)
    }
}
