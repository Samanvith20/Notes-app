import mongoose from "mongoose";
 
 export const connectDb=async()=>{
    try {
        let  db=await mongoose.connect("mongodb+srv://yervala:samanvith@cluster0.xsnyqa6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        // console.log(db);
    } catch (error) {
         
    console.error("Error connecting to database:", error);
            process.exit(1);
    }
}