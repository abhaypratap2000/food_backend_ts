import express , {Request , Response , NextFunction} from "express";
import { CreateVendor} from "../controllers";

const router = express.Router();

router.post('/createVendor' ,CreateVendor )



router.get('/' , (req:Request , res:Response , next:NextFunction)=>{

    res.json({message : "Hello from Vendor side"})

})


export {router as VenderRoute};
