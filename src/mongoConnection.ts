import mongoose from "mongoose";

const connectDB=async ()=>{
    const devUrl="mongodb://127.0.0.1:27017/Blog?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6"
    await mongoose.connect(devUrl)
}

const db=mongoose.connection;
db.on("connected",()=>console.log("Mongodb Connected"))
db.on("disconnected",()=>console.log("Mongodb Disconnected"))
db.on("error",(err)=>console.log("Error has occured: ",err))
process.on("SIGINT",async ()=>{
    await mongoose.connection.close();
    console.log("connection has been terminated")
    process.exit(0);
})

export default connectDB;