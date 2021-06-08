const router=require('express').Router();
let Contactus=require('../models/contactus.model');
router.route('/').post((req, res) => {
    Contactus.find()
      .then(contacts => res.json(contacts))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Contactus.findById(req.params.id)
      .then(contact => res.json(contact))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/add').post((req,res)=>{
    const firstname= req.body.firstname;
    const lastname=req.body.lastname;
    const contactnumber= req.body.contactnumber;
    const email=req.body.email;
    const query=req.body.query;
    const newContactus=new Contactus({
       firstname,
       lastname,
       contactnumber,
       email,
       query
    })
    newContactus.save()
    .then(()=>res.json('Contact Added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/update/:id').post((req,res)=>{
    Contactus.findById(req.params.id)
    .then(contact => {
      contact.firstname = req.body.firstname;
      contact.lastname = req.body.lastname;
      contact.contactnumber = req.body.contactnumber;
      contact.email = req.body.email;
      contact.query=req.body.query;

      contact.save()
        .then(() => res.json('Contact Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Contactus.findByIdAndDelete(req.params.id)
      .then(() => res.json('Contact Deleted!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/delete').post(async(req,res)=>{
    const ids=req.body.arrayids;
    await Contactus.deleteMany({_id:{$in:ids}})
    res.status(200).json({ message: 'Deleted Successfully'});
  })
  module.exports=router;