

import express , {Request , Response , NextFunction} from "express";
import { CreateVendorsInput } from "../dto";
import {Vandor} from '../models'
import { genratePassword, genrateSalt } from "../utility";

// export const CreateVendor = async (req:Request , res:Response , next:NextFunction)=>{
//     const {name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVendorsInput> req.body;
//     const doesVendorAlreadyExist = await Vandor.findOne({email:email});
//     if(doesVendorAlreadyExist !== null){
//         return res.json({"message" : "Vandor is already Exist !!"})
//     }
//     const salt = await genrateSalt();
//     const userPassword = await genratePassword(password,salt);

//     const createdVendor = await Vandor.create({
//         name:name,
//         address:address,
//         pincode:pincode,
//         foodType:foodType,
//         email:email,
//         password:userPassword,
//         salt:salt,
//         ownerName:ownerName,
//         phone:phone,
//         rating:0,
//         serviceAvailable:false,
//         coverImages:[],

//     })
//    return res.json(createdVendor);
// }


export const CreateVendor = async (req:Request , res:Response , next:NextFunction)=>{
    const data = <CreateVendorsInput> req.body;
    const email = data.email;
    const doesVendorAlreadyExist = await Vandor.findOne({email:email});
    if(doesVendorAlreadyExist !== null){
        return res.json({"message" : "Vandor is already Exist !!"})
    }
    const salt = await genrateSalt();
    data.salt = salt;
    const password = data.password;
    const userPassword = await genratePassword(password,salt);
    data.password = userPassword;
    const createdVendor = await new Vandor(data).save()
//         name:name,
//         address:address,
//         pincode:pincode,
//         foodType:foodType,
//         email:email,
//         password:userPassword,
//         salt:salt,
//         ownerName:ownerName,
//         phone:phone,
//         rating:0,
//         serviceAvailable:false,
//         coverImages:[],

//     })
   return res.json(createdVendor);
}
export const GetVendor = async (req:Request , res:Response , next:NextFunction)=>{

}

export const GetVendorById = async (req:Request , res:Response , next:NextFunction)=>{

}