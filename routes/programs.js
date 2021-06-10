const router=require('express').Router();
const multer=require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);  
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
// const upload=multer({dest:'uploads/'});
let Program=require('../models/program.model');
router.route('/').post((req,res)=>{
    Program.find()
    .then(programs=>res.json(programs))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/:id').get((req, res) => {
    Program.findById(req.params.id)
      .then(program => res.json(program))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/search').post((req, res) => {
    Program.find({classname : req.body.classname})
      .then(programs => res.json(programs))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.post('/add',upload.array('images',2),(req,res,next)=>{
    const classname = req.body.classname;
    const sdateandtime=req.body.sdateandtime;
    const image =req.files[0].path;
    const description = req.body.description;
    const duration =req.body.duration;
    const totalexercises=req.body.totalexercises;
    const chooseinstructor=req.body.chooseinstructor;
    const category=req.body.category;
    const access=req.body.access;
    const price=req.body.price;
    const exercise={
        exercisename:req.body.exercisename,
        video:req.body.video,
        category:
            {
                categoryname:req.body.categoryname,
                cimage:req.files[1].path,
                caloriesburnt:req.body.caloriesburnt,
            }
    };
    const instructorprofile=req.body.instructorprofile;
    const pmaterial=req.body.pmaterial;
    const status=req.body.status;
    const subscribe=req.body.subscribe;
    const newProgram=new Program({
        classname,
        sdateandtime,
        image,
        description,
        duration,
        totalexercises,
        chooseinstructor,
        category,
        access,
        price,
        exercise,
        instructorprofile,
        pmaterial,
        status,
        subscribe
    })
    newProgram.save()
  .then(() => res.json('Program added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
// router.post('/adds',upload.array('images',2),(req,res,next)=>{
//   const classname = req.body.classname;
//   const sdateandtime=req.body.sdateandtime;
//   const image =req.files[0].path;
//   const description = req.body.description;
//   const duration =req.body.duration;
//   const totalexercises=req.body.totalexercises;
//   const chooseinstructor=req.body.chooseinstructor;
//   const category=req.body.category;
//   const access=req.body.access;
//   const price=req.body.price;
//   const exercise={
//       exercisename:req.body.exercisename,
//       video:req.body.video,
//       category:[
//           {
//               categoryname:req.body.categoryname,
//               cimage:req.files[1].path,
//               caloriesburnt:req.body.caloriesburnt,
//           }
//       ]
//   };
//   const instructorprofile=req.body.instructorprofile;
//   const pmaterial=req.body.pmaterial;
//   const status=req.body.status;
//   const subscribe=req.body.subscribe;
//   const newProgram=new Program({
//       classname,
//       sdateandtime,
//       image,
//       description,
//       duration,
//       totalexercises,
//       chooseinstructor,
//       category,
//       access,
//       price,
//       exercise,
//       instructorprofile,
//       pmaterial,
//       status,
//       subscribe
//   })
//   newProgram.save()
// .then(() => res.json('Program added!'))
// .catch(err => res.status(400).json('Error: ' + err));
// });
    router.post('/update/:id',upload.array('images',2),(req,res,next)=>{
    Program.findById(req.params.id)
      .then(program => {
        program.classname = req.body.classname;
        program.image = req.files[0].path;
        program.description = req.body.description;
        program.duration =req.body.duration;
        program.chooseinstructor=req.body.chooseinstructor;
        program.category=req.body.category;
        program.access=req.body.access;
        program.price=req.body.price;
        program.exercise={
            exercisename:req.body.exercisename,
            video:req.body.video,
            category:
                {
                    categoryname:req.body.categoryname,
                    cimage:req.files[1].path,
                    caloriesburnt:req.body.caloriesburnt,
                }
        };
        program.pmaterial=req.body.pmaterial;
        program.status=req.body.status;
        program.save()
          .then(() => res.json('Program updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Program.findByIdAndDelete(req.params.id)
      .then(() => res.json('Program deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/delete').post(async(req,res)=>{
    const ids=req.body.arrayids;
    await Program.deleteMany({_id:{$in:ids}})
    res.status(200).json({ message: 'Deleted Successfully'});
  })
  module.exports=router;