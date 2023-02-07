import { SendInterface } from "./SendInterface.js";

/**
 * Wrapper to send success message to user.
 */
export class SendSuccess implements SendInterface{
    status: string;
    data: any;
    
    constructor(data:any){
        this.status = "Success"
        this.data = data
    }

    stringify(): string {
        return JSON.stringify(this)
    }
}
