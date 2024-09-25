const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Post = require("../models/packageModel");

// Validation rules for creating and updating posts
const validatePost = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("type").not().isEmpty().withMessage("Type is required"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description should be at least 10 characters long"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

// Error handling middleware for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create API route for Create method in CRUD Operations
router.post("/create", validatePost, handleValidationErrors, (req, res) => {
  Post.create({
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
  })
    .then((doc) => res.status(201).json(doc))
    .catch((err) =>
      res.status(500).json({ error: "Internal Server Error", details: err })
    );
});

// Create API route for Read method in CRUD Operations
router.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) =>
      res.status(500).json({ error: "Internal Server Error", details: err })
    );
});

// Create API route for Delete method in CRUD Operations
router.delete("/delete/:id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => {
      if (!doc) return res.status(404).json({ error: "Post not found" });
      res.json({ message: "Post deleted successfully", doc });
    })
    .catch((err) =>
      res.status(500).json({ error: "Internal Server Error", details: err })
    );
});

// Create API route for Update method in CRUD Operations
router.put("/update/:id", validatePost, handleValidationErrors, (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
    },
    { new: true } // Return the updated document
  )
    .then((doc) => {
      if (!doc) return res.status(404).json({ error: "Post not found" });
      res.json(doc);
    })
    .catch((err) =>
      res.status(500).json({ error: "Internal Server Error", details: err })
    );
});

module.exports = router;
