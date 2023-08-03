import express, { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, EditVendorInputs, VendorLoginInputs } from "../dto";
import { FindVandor, FindVandor2 } from "../services/VandorService";
import bcrypt from 'bcrypt';
import { genrateSigtanure } from "../utility";
import { Food } from "../models/Food";


export const CreateAdmin = async (req: Request, res: Response, next: NextFunction) => {

}

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const data = <VendorLoginInputs>req.body;
    console.log("data", data)
    const existingVandor = await FindVandor(" ", data.email);
    if (existingVandor !== null) {
        const validate = await bcrypt.compare(data.password, existingVandor.password);
        if (validate) {
            const signature = genrateSigtanure({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodTypes: existingVandor.foodType,
                name: existingVandor.name
            })
            return res.json(signature);
        }
    } else {
        return res.json({ "message": "Password is not valid" })
    }
    return res.json({ "message": "Login credential not valid" })
}



export const getVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log(user);
    if (user) {
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor)
    }
    return res.json({ "message": "vendor info not found" })
}

export const updateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const data = <EditVendorInputs>req.body;
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if (existingVandor !== null) {
            existingVandor.name = data.name;
            existingVandor.address = data.address;
            existingVandor.foodType = data.foodType;
            existingVandor.phone = data.phone;
            const saveResult = await existingVandor.save();
            return res.json(saveResult)
        }
    }
    return res.json({ 'message': "vandor information is not found" })

}

export const updateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const savedResult = await existingVandor.save();
            return res.json(savedResult);
        }
        return res.json(existingVandor)
    }
    return res.json({ 'message': "vandor information is not found" })
}

export const addfood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const data = <CreateFoodInputs>req.body;
        console.log("data",data)
        const Vandor = await FindVandor(user._id);
        let fileNames 
        if (Vandor !== null) {
            const uploadedFiles = req.files as [Express.Multer.File];
            if (uploadedFiles) {
               fileNames = uploadedFiles.map(file => file.filename);
               
            } 
            else {
                res.status(400).send('No files uploaded');
            }
            console.log("fileNames", fileNames);
            data.vandorId = Vandor._id;
            data.images = fileNames;
    
            const createdFood = await new Food(data).save();
            Vandor.foods.push(createdFood);
            const result = await Vandor.save();
            return res.json(result);

        }
    }
    return res.json({ "message": "Something went wrong with add food" })
}

    

export const getFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const food = await Food.find({ vandorId: user._id });

        if (food !== null) {
            return res.json(food);
        }
    }
    return res.json({ "message": "Something went wrong to get food " })
}

// export const updateVandorCoverImage = async (req: Request, res: Response, next: NextFunction)=>{

//     const user = req.user;
//     if (user) {
//         const Vandor = await FindVandor(user._id);
      
//         if (Vandor !== null) {
//             const uploadedFiles = req.files as [Express.Multer.File];
//             if (uploadedFiles) {
//                 Vandor.coverImages = uploadedFiles.map((file: Express.Multer.File) => file.filename);
         
//             } 
//             else {
//                 res.status(400).send('No files uploaded');
//             }  

//             const result = await Vandor.save();
//             return res.json(result);

//         }
//     }
//     return res.json({ "message": "Something went wrong with update cover Image" })
// }


export const updateVandorCoverImage = async (req: Request, res: Response, next: NextFunction)=>{

    const user = req.user;
    if (user) {
        
        const uploadedFiles = req.files as [Express.Multer.File];
        const data = uploadedFiles.map((file: Express.Multer.File) => file.filename);
        const Vandor = await FindVandor2(user._id ,data);
        return res.json(Vandor);
    }
    return res.json({ "message": "Something went wrong with update cover Image" })
}