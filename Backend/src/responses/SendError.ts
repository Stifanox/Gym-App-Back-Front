import { SendInterface } from "./SendInterface.js";

/**
 * Wrapper to send error message to user.
 */
export class SendError implements SendInterface{
    status: string;
    data: any;

    constructor(data:any) {
        this.status = "Error";
        this.data = data
    }
    
    stringify(): string {
        return JSON.stringify(this)
    }
}