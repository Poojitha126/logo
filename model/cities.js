const mongoose=require("mongoose")


const CitySchema =mongoose.Schema({
    state:{type:"String",
            require:true,
            district:{type:"String"}}
    
});

const City=mongoose.model("City",CitySchema);
module.exports=City;