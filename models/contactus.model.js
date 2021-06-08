const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const contactusSchema=new Schema(
    {
       firstname:{
           type:String,
       },
       lastname:{
           type:String,
       },
       contactnumber:{
           type:String
       },
       email:{
           type:String
       },
       query:{
           type:String
       }
    },
    {
        timestamps:true,
    }
);
const Contactus=mongoose.model('Contactus',contactusSchema);
module.exports=Contactus;