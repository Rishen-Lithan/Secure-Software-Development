// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/appointmentPackModel');

// // Create API route for Create method in CRUD Operations
// router.post("/make", (req, res) => {
//     Appointment.create({
//         name: req.body.name,
//         contact: req.body.contact,
//         email: req.body.email,
//         date: req.body.date,
//         time: req.body.time,
//         package: req.body.package
//     })
//         .then((doc) => console.log(doc))
//         .catch((err) => console.log(err));
// });

// //Create API route for Read method in CRUD Operations

// router.get("/appointments", (req, res) => {
//     Appointment.find()
//         .then((items) => res.json(items))
//         .catch((err) => console.log(err));
// });



// // Create API route for Delete method in CRUD Operations
// router.delete("/delete/:id", (req, res) => {
//     //create route for delete
//     Appointment.findByIdAndDelete({ _id: req.params.id })
//         .then((doc) => console.log(doc))
//         .catch((err) => console.log(err));
// });

// // Create API route for Update method in CRUD Operations
// router.put("/update/:id", (req, res) => {
//     Appointment.findByIdAndUpdate(
//         { _id: req.params.id },
//         {
//             name: req.body.name,
//             contact: req.body.contact,
//             email: req.body.email,
//             date: req.body.date,
//             time: req.body.time,
//             package: req.body.package,
//         }
//     )
//         .then((doc) => console.log(doc))
//         .catch((err) => console.log(err));

// });

// module.exports = router;