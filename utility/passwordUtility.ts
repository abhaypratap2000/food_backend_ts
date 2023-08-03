import * as bcrypt from  'bcrypt';
import { VendorPayload } from '../dto';
import jwt from "jsonwebtoken";
import { OUR_APP_SECRET } from '../config';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';

export const genrateSalt = async ()=>{
    return await bcrypt.genSalt()
}

export const genratePassword = async (password :string , salt: string) => {
    return await bcrypt.hash(password , salt);
}

export const genrateSigtanure = (payload : VendorPayload)=>{
    const signature = jwt.sign(payload , OUR_APP_SECRET , {expiresIn : '1d'});
    return signature
}

export const validateSignature = async(req:Request)=>{

    const signature = req.get('Authorization');
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1],OUR_APP_SECRET) as AuthPayload;
        req.user = payload;
        return true;
    }

}