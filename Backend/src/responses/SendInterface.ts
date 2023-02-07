/**
 * Basic interface for all Send type classes.
 */
export interface SendInterface{
    status:string,
    data:any;
    stringify():string
}