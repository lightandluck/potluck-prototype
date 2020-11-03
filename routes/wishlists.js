const router = require('express').Router();
const mongoose = require('mongoose');
let Wishlist = require('../models/wishlist.model');

router.route('/').get((req, res) => {
  Wishlist.find()
    .then(wishlists => res.json(wishlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Wishlist.find({ "playerId": req.params.id})
    .then(wishlist => res.json(wishlist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:id').post((req, res) => {
  const playerId = req.body.playerId;
  const potluckItemId = req.body.potluckItemId;
  
  const query = Wishlist.find();

  const filter = { "playerId": playerId };
  query.findOneAndUpdate(filter,
    {
      $push: { "potluckItems": potluckItemId }
    }, {
      new: true,
      upsert: true
    })
    .then(() => res.json('Wishlist item added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Wishlist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Wishlist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;