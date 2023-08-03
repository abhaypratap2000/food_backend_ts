export interface CreateVendorsInput{
    name:string,
    ownerName:string,
    foodType:[string],
    pincode:string,
    address:string,
    phone:string,
    password:string,
    email:string,
    salt:string,
    foods:any

} 

export interface VendorLoginInputs{
    email:string;
    password:string;
}

export interface VendorPayload{
    _id : string ;
    email:string;
    name:string;
    foodTypes:[string];
    //
}

export interface EditVendorInputs{
    address : string,
    phone:string,
    name:string,
    foodType:[string]
}
