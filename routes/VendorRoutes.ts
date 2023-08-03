import express , {Request , Response , NextFunction} from "express";
import { CreateVendor, addfood, getFood, getVandorProfile, updateVandorCoverImage, updateVandorProfile, updateVandorService, vendorLogin} from "../controllers";
import { Authenticate } from "../middlewares/commonAuth";
import { multerMiddleware } from "../helper";

const router = express.Router();
router.post('/createVendor' ,CreateVendor );
router.post('/login' , vendorLogin);

router.use(Authenticate)
router.get('/profile' ,getVandorProfile);
router.patch('/profile' , updateVandorProfile);
router.post('/updateCoverImage' ,multerMiddleware.single('images' ), updateVandorCoverImage)
router.patch('/service' , updateVandorService);


router.post('/food' , multerMiddleware.array('images' , 10), addfood);
router.get('/foods' , getFood);

router.get('/' , (req:Request , res:Response , next:NextFunction)=>{
    res.json({message : "Hello from Vendor side"})
})


export {router as VenderRoute};
