const express = require('express');
const router = express.Router();
const Product = require('../models/inventoryModel');

// Create API route for Create method in CRUD Operations
router.post("/add", (req, res) => {
    const { name, type, category, date, rquantity, uquantity, totalPrice } = req.body;

    // Validate each input field
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Please enter the product name' });
    }

    if (!type || type.trim() === '') {
        return res.status(400).json({ message: 'Please enter the product type' });
    }

    if (!category || category.trim() === '') {
        return res.status(400).json({ message: 'Please enter the product category' });
    }

    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Please provide a valid date' });
    }

    if (typeof rquantity === 'undefined' || isNaN(rquantity) || rquantity <= 0) {
        return res.status(400).json({ message: 'Please enter a valid received quantity' });
    }

    if (typeof uquantity === 'undefined' || isNaN(uquantity) || uquantity < 0) {
        return res.status(400).json({ message: 'Please enter a valid used quantity' });
    }

    if (typeof totalPrice === 'undefined' || isNaN(totalPrice) || totalPrice < 0) {
        return res.status(400).json({ message: 'Please enter a valid total price' });
    }

    // Create the product
    Product.create({
        name,
        type,
        category,
        date,
        rquantity,
        uquantity,
        totalPrice
    })
        .then((doc) => {
            console.log(doc);
            res.status(201).json({ message: 'Product successfully created', product: doc });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Failed to create product' });
        });
});

// Create API route for Read method in CRUD Operations
router.get("/products", (req, res) => {
    Product.find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
});


// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", (req, res) => {
    //create route for delete
    Product.findByIdAndDelete({ _id: req.params.id })
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
});

// Update API route for Update method in CRUD Operations
router.put("/update/:id", (req, res) => {
    const { name, type, category, date, rquantity, uquantity, totalPrice } = req.body;

    // Validate each input field
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Please enter the product name' });
    }

    if (!type || type.trim() === '') {
        return res.status(400).json({ message: 'Please enter the product type' });
    }

    if (!category || category.trim() === '') {
        return res.status(400).json({ message: 'Please enter the product category' });
    }

    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ message: 'Please provide a valid date' });
    }

    if (typeof rquantity === 'undefined' || isNaN(rquantity) || rquantity <= 0) {
        return res.status(400).json({ message: 'Please enter a valid received quantity' });
    }

    if (typeof uquantity === 'undefined' || isNaN(uquantity) || uquantity < 0) {
        return res.status(400).json({ message: 'Please enter a valid used quantity' });
    }

    if (typeof totalPrice === 'undefined' || isNaN(totalPrice) || totalPrice < 0) {
        return res.status(400).json({ message: 'Please enter a valid total price' });
    }

    // Update the product
    Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
            name,
            type,
            category,
            date,
            rquantity,
            uquantity,
            totalPrice,
        },
        { new: true }
    )
    .then((doc) => {
        if (!doc) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(doc);
        res.status(200).json({ message: 'Product successfully updated', product: doc });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Failed to update product' });
    });
});

module.exports = router;