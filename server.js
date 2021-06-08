const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const session=require('express-session');
const passport=require('passport');
const Admin = require('./models/admin.model');
const Customer=require('./models/customer.model');
const Instructor=require('./models/instructor.model');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const port=process.env.PORT || 80;
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Atlas started successfully")
})
passport.use('adminLocal',Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
passport.use('customerLocal',Customer.createStrategy());
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());
passport.use('instructorLocal',Instructor.createStrategy());
passport.serializeUser(Instructor.serializeUser());
passport.deserializeUser(Instructor.deserializeUser());
const adminRouter=require('./routes/admin');
const videoRouter=require('./routes/videos');
const faqRouter=require('./routes/faqs');
const contactusRouter=require('./routes/contactus');
const customerRouter=require('./routes/customers');
const paymentRouter=require('./routes/payments');
const feedRouter=require('./routes/feeds');
const instructorRouter=require('./routes/instructors');
const programRouter=require('./routes/programs');
const liveclassRouter=require('./routes/liveclasses');
const subscriberRouter=require('./routes/subscribers');
app.use('/admin',adminRouter);
app.use('/videos',videoRouter);
app.use('/faqs',faqRouter);
app.use('/contactus',contactusRouter);
app.use('/customers',customerRouter);
app.use('/payments',paymentRouter);
app.use('/feeds',feedRouter);
app.use('/instructors',instructorRouter);
app.use('/programs',programRouter);
app.use('/liveclasses',liveclassRouter);
app.use('/subscribers',subscriberRouter);
app.listen(port,function(){
    console.log("Server started Successfully");
});