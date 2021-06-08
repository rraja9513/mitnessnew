const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const videoSchema=new Schema(
    {
       exercisename:{
           type:String,
       },
       vname:{
           type:String,
       },
       exerciseduration:{
           type:String,
       },
       exerciseprice:{
           type:String,
       },
       access:{
        type:String,
    },
    status:{
        type:String,
    },
    },
    {
        timestamps:true,
    }
);
const Video=mongoose.model('Video',videoSchema);
module.exports=Video;