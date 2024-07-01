import { Schema, model,Document } from "mongoose";

export interface UserDataType extends Document{
    userNameStore:String,
    passwordStore:String,
    emailStore:String,

}

const userSchema=new Schema<UserDataType>({
    userNameStore:String,
    passwordStore:String,
    emailStore:String,
 
});

export default model<UserDataType>("users",userSchema);