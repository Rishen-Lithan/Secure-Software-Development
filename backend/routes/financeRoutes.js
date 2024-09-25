const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Finance = require('../models/financeModel');

// Create API route for Create method in CRUD Operations
router.post("/add", [
    // Validation rules
    check('amount', 'Amount is required and must be a number').isNumeric(),
    check('type', 'Type is required').notEmpty(),
    check('category', 'Category is required').notEmpty(),
    check('date', 'Date is required and must be a valid date').isISO8601(),
    check('description', 'Description should not be empty').optional(),
    check('reference', 'Reference should not be empty').optional(),
], (req, res) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Finance.create({
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description,
        reference: req.body.reference
    })
        .then((doc) => res.json(doc))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Create API route for Read method in CRUD Operations
router.get("/trans", (req, res) => {
    Finance.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", (req, res) => {
    Finance.findByIdAndDelete({ _id: req.params.id })
        .then((doc) => {
            if (!doc) return res.status(404).json({ message: 'Transaction not found' });
            res.json({ message: 'Transaction deleted', doc });
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Create API route for Update method in CRUD Operations
router.put("/update/:id", [
    // Validation rules for update
    check('amount', 'Amount must be a number').optional().isNumeric(),
    check('type', 'Type is required').optional().notEmpty(),
    check('category', 'Category is required').optional().notEmpty(),
    check('date', 'Date must be a valid date').optional().isISO8601(),
    check('description', 'Description should not be empty').optional(),
    check('reference', 'Reference should not be empty').optional(),
], (req, res) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Finance.findByIdAndUpdate(
        { _id: req.params.id },
        {
            amount: req.body.amount,
            type: req.body.type,
            category: req.body.category,
            date: req.body.date,
            description: req.body.description,
            reference: req.body.reference,
        },
        { new: true } // Option to return the updated document
    )
    .then((doc) => {
        if (!doc) return res.status(404).json({ message: 'Transaction not found' });
        res.json({ message: 'Transaction updated', doc });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
