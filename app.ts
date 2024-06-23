import express from "express";

const app=express();

app.get("/",(req,res,next)=>{
    res.send("fuckoff");
})


app.listen(3001)