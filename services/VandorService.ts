

import {Vandor} from '../models/Index'

export const FindVandor = async(id:string | undefined , email?:string)=>{
    if(email){
        return await Vandor.findOne({email:email});
    }else{
        return await Vandor.findById(id);
    }
}

export const FindVandor2 = async(id:string , coverImages?:String[])=>{
    return await Vandor.findByIdAndUpdate(id,{
        $push:{coverImages}
    }).then((res)=>{
        if(res){
            return res;
        }else{
            return "Vandor not found !";
        }
    })
}
