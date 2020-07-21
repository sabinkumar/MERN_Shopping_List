const express = require("express");
const router = express.Router();

//Item model
const Item = require("../../models/items");

// @route  GET api/items
// @desc Get All items
// @access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route  POST api/items
// @desc  Create as item
// @access Public //private if you have authentication
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// @route  DELETE api/items/:id
// @desc  Delete as post
// @access Public //private if you have authentication
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ sucecss: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
