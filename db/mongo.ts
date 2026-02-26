import mongoose from "mongoose";

export default async function dbConnect(){
    try{
        if(mongoose.connections.length>0){
            const connectionState=mongoose.connections[0].readyState
            if(connectionState===1){
                console.log("mongodb already connected")
                return
            }
        }
await mongoose.connect(process.env.MONGO_URI!);
const connections=mongoose.connection;

connections.on("connected" ,()=>{
 console.log("mongodb connected successfully");

})

    }catch(err){
console.log(err.message);
throw new Error("problem in connected to db")
    }
}