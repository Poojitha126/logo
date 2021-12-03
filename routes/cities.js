const express=require("express");
const router=express.Router()
const City=require("../model/cities");
const Child=require("../model/child");

router.get("/",async function(req,res){
    try{

        const states= await City.findfind({}, 'state');
        return res.json({
            status:"success",
            data:{
                states
            }
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })

    }
    
})
router.post("/",async function(req,res){
    const {state}=req.body;
    
    const city=await City.create({state});
    res.json({
        status:"success",
        data:{
            city
        }
    })
    
})
router.post("/:state",async function(req,res){
    const {district}=req.body;
    
    const city=await City.findOne({state:req.params.state});
    if (!city){
        return res.status(404).json({
            status:"failed",
            message:"State Not Found"
        })
    }
    city.district=district
    res.json({
        status:"success"
    })
    
})
router.get("/districts",async function(req,res){
    try{

        const districts= await City.find();
        return res.json({
            status:"success",
            data:{
                districts
            }
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })

    }
    
})
router.get("/child",async function(req,res){
    try{

        const child= await Child.find();
        return res.json({
            status:"success",
            data:{
                child
            }
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })

    }
    
})
router.post("/child",async function(req,res){
    const {name,sex, dateOfBirth,fatherName,motherName}=req.body;
    
    const child=await Child.create({name,sex, dateOfBirth,fatherName,motherName,state:req.state,district:req.state.district});
    
    res.json({
        status:"success",
        data:{
            child
        }
    })
    
})
module.exports=router