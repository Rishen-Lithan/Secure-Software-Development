const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Att = require('../models/attendanceModel');
const Attendance = mongoose.model("Attendece")



router.post("/create", (req, res) =>{
const{date,attendan, name}= req.body;

var objectId = new mongoose.Types.ObjectId(attendan);

    const attendance = new Attendance({
    date:date,
    attendance:objectId,
    name:name
})
attendance.save().then(result=>{
    res.json({attendance:result})
})
.catch(err=>{
    console.log(err)
})
     
});



// Create API route for Create method in CRUD Operations
router.post("/add", (req, res) => {
    Att.create({
        name: req.body.name,
        id: req.body.id,
        date: req.body.date,
        state: req.body.state
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

// Create API route for Read method in CRUD Operations
router.get("/data", (req, res) => {
    Att.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});



// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", (req, res) => {
    //create route for delete
    Att.findByIdAndDelete({ _id: req.params.id })
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  });

// Create API route for Update method in CRUD Operations
router.put("/update/:id", (req, res) => {
    Att.findByIdAndUpdate (
        { _id: req.params.id},
        {
            name: req.body.name,
            id: req.body.id,
            date: req.body.date,
            state: req.body.state,
        }
    )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
        
});


router.post('/get/daily', async (req,res)=>{
 
    const {date} = req.body;
    console.log(date);

    try{

        Attendance.find({date:date})
        .populate("attendance", "name")
        .then((data)=>{
            res.status(200).json(data)
        }).catch((err)=>{
            console.log(err);
            return res.status(400).json({ error: "Something has error" });
        })

    }catch{
        return res.status(400).json({ error: "Something has error" });
    }

});


module.exports = router;