const express = require('express')
const router =express.Router();
const Supplier = require('../models/supplierModel');

// Create API route for Create method in CRUD Operations
router.post("/add", (req, res) => {
    Supplier.create({
        name: req.body.name,
        product: req.body.product,
        contact: req.body.contact,
        email: req.body.email,
        status: req.body.status,
        date: req.body.date,
        quantity: req.body.quantity,
        price: req.body.price
    })
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
});

// Create API route for Read method in CRUD Operations
router.get("/sups", (req, res) => {
    Supplier.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});



// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", (req, res) => {
    //create route for delete
    Supplier.findByIdAndDelete({ _id: req.params.id })
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  });

// Create API route for Update method in CRUD Operations
router.put("/update/:id", (req, res) => {
    Supplier.findByIdAndUpdate (
        { _id: req.params.id},
        {
            name: req.body.name,
            product: req.body.product,
            contact: req.body.contact,
            email: req.body.email,
            status: req.body.status,
            date: req.body.date,
            quantity: req.body.quantity,
            price: req.body.price,
        }
    )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
        
});

module.exports = router;