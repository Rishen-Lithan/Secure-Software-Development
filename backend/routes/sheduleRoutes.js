const express = require('express');
const router = express.Router();
const Shedule = require('../models/sheduleModel');

// Create API route for Create method in CRUD Operations
router.post("/make", (req, res) => {
    Shedule.create({
        name: req.body.name,
        contact: req.body.contact,
        date: req.body.date,
        time: req.body.time,
        service: req.body.service
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

// Create API route for Read method in CRUD Operations
router.get("/shedules", (req, res) => {
    Shedule.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});



// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", (req, res) => {
    //create route for delete
    Shedule.findByIdAndDelete({ _id: req.params.id })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

// Create API route for Update method in CRUD Operations
router.put("/update/:id", (req, res) => {
    Shedule.findByIdAndUpdate(
        { _id: req.params.id },
        {
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            date: req.body.date,
            time: req.body.time,
            service: req.body.service,
        }
    )
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));

});

module.exports = router;