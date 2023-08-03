

import express , {Request , Response , NextFunction} from "express";
import { CreateVendorsInput } from "../dto";
import {Vandor} from '../models/Index'
import { genratePassword, genrateSalt } from "../utility";
import { FindVandor } from "../services/VandorService";

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
    data.foods = [];
    const createdVendor = await new Vandor(data).save()
   return res.json(createdVendor);
}

export const GetVendor = async (req:Request , res:Response , next:NextFunction)=>{
    const vandors = await Vandor.find();
    if(vandors !== null){
        return res.json(vandors)
    } 
    return res.json({"message" :"vandors data is not exist"})
}

export const GetVendorById = async (req:Request , res:Response , next:NextFunction)=>{
    const vandorId = req.params.id;
    const vandor = await FindVandor(vandorId);
    if(vandor !== null){
        return res.json(vandor);
    }
    return res.json({"message" :"vandor data is not avaiable"})
}