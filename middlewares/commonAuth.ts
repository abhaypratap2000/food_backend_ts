import { AuthPayload } from "../dto/Auth.dto";
import {Request , Response , NextFunction} from "express" ; 
import { validateSignature } from "../utility";


declare global {
    namespace Express {
        interface Request{
            user?:AuthPayload
        }
    }
}

export const Authenticate = async(req : Request , res:Response , next:NextFunction)=>{

    const validate = await validateSignature(req);
    if(validate){
        next()
    }else{
        return res.json({"message" : "user not Authorised"})
    }
}