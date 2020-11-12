const router = require('express').Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let Wishlist = require('../models/wishlist.model');
let Offering = require('../models/offering.model');

router.route('/').get((req, res) => {
  Wishlist.find()
    .then(wishlists => res.json(wishlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Wishlist.findOne({ playerId: req.params.id })
      .populate('offerings.offeringId', '-acceptableTrades -updatedAt -createdAt -__v')
      .populate('playerId', 'name')
      .then(wishlist => res.json(wishlist))
      .catch(err => res.status(400).json('Error: ' + err));    
});


router.route('/add').post((req, res) => {
  const playerId = req.body.playerId;
  const offeringInList = {
    offeringId: req.body.offeringId,
    isSteward: req.body.isSteward || false
  }

  const query = Wishlist.find();

  // filter out duplicate in wishlist array: https://stackoverflow.com/questions/33576223/using-mongoose-mongodb-addtoset-functionality-on-array-of-objects
  const filter = { 
    "playerId": playerId 
  };
  
  query.updateOne(
    filter,
    { $addToSet: { "offerings": offeringInList } },
    {
      new: true,
      upsert: true
    })
    .then(() => res.json('Wishlist item added!'))
    .catch(err => {
      //TODO: Finding the duplicate sends a Mongo error, find a better fix for this
      if (err.code === 11000) {
        res.json('Duplicate item not added!')
      }
      else {
        res.status(400).json(err);
      }      
    });
});

router.route('/:id').delete((req, res) => {
  Wishlist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Wishlist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;