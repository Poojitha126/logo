const mongoose=require("mongoose")


const ChildSchema =mongoose.Schema({
   name:{type:"String",require:true},
   sex:{type:"String","enum": ["Male","female","Others"]},
   dateOfBirth: {
    type: Date,
    required: true,
    trim: true},
    fatherName:{type:"String",require:true},
    motherName:{type:"String",require:true},
    state:[{type:mongoose.Types.ObjectId,ref:"City"}],
    district:[{type:mongoose.Types.ObjectId,ref:"City"}]
    
});

const Child=mongoose.model("Child",ChildSchema );
module.exports=Child;