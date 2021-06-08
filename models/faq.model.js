const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const faqSchema=new Schema(
    {
       question:{
           type:String,
       },
       answer:{
           type:String,
       }
    },
    {
        timestamps:true,
    }
);
const Faq=mongoose.model('Faq',faqSchema);
module.exports=Faq;