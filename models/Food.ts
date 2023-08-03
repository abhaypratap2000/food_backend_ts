import mongoose , {Schema , Document , Model} from "mongoose";

interface FoodDoc extends Document {
    vandorId:string;
    name:string;
    description:string;
    category:string;
    foodType:string;
    readyTime:number;
    price:number;
    images:[string]
}


const FoodSchema = new Schema({
    vandorId:{type:String , require:true},
    name:{type:String , require:true},
    description:{type:String , require:true},
    category:{type:String , require:true},
    foodType:{type:String , require : true},
    readyTime:{type :Number , require:true},
    price:{type:Number , require:true},
    images:{ type:[String]}


},{ 
    toJSON:{
        transform(doc , ret){
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt
        }
    },
    timestamps: true 
})

const Food = mongoose.model<FoodDoc>("food" ,FoodSchema);
export {Food};