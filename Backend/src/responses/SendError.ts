import { SendInterface } from "./SendInterface.js";

export class SendError implements SendInterface{
    status: string;
    data: string;

    constructor(data:string) {
        this.status = "Error";
        this.data = data
    }
    
    stringify(): string {
        return JSON.stringify(this)
    }
}