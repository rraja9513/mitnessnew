const router=require('express').Router();
let Video=require('../models/video.model');
router.route('/').post((req,res)=>{
Video.find()
.then(videos=>res.json(videos))
.catch(err => res.status(400).json('Error: ' + err));
});
router.route('/search').post((req, res) => {
    Video.find({exercisename : req.body.exercisename})
      .then(videos => res.json(videos))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/add').post((req,res)=>{
    const exercisename= req.body.exercisename;
    const vname=req.body.vname;
    const exerciseduration = req.body.exerciseduration;
    const exerciseprice = req.body.exerciseprice;
    const access = req.body.access;
    const status= req.body.status;
    const newVideo=new Video({
        exercisename,
        vname,
        exerciseduration,
        exerciseprice,
        access,
        status,
    })
    newVideo.save()
    .then(()=>res.json('Video Added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/:id').delete((req, res) => {
    Video.findByIdAndDelete(req.params.id)
      .then(() => res.json('Video deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/delete').post(async(req,res)=>{
    const ids=req.body.arrayids;
    await Video.deleteMany({_id:{$in:ids}})
    res.status(200).json({ message: 'Deleted Successfully'});
  })
module.exports=router;