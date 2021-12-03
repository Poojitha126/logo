const bodyParser = require("body-parser");
const express=require("express")
const mongoose=require("mongoose");

const app=express();
const IndexRouter=require("./routes/index")
const CityRouter = require("./routes/cities")
const jwt=require("jsonwebtoken");


mongoose.connect("mongodb://localhost/dhwani");


app.use("/posts",function(req,res,next){
    try{
        const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token){
        res.status(401).json({
            status:"failed",
            message:"Not Authenticated"
        });
        
    }
    const decoded=jwt.verify(token,"Insta-Secret-123");
    if (!decoded){
        return res.status(401).json({
            status:"failed",
            message:"Invalid token"
        })
    }
    req.user=decoded.data //getting the user id from token
    }catch(e){
        return res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
    next();
})

app.use(bodyParser());
app.use("/",IndexRouter);
app.use("/states",CityRouter);


// app.get("/",function(req,res){
//     res.json({
//         status:"success"
//     });
// })


app.listen("5000",()=>console.log("serving"))