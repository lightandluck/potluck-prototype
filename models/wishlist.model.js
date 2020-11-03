const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  playerId: { type: String, required: true },
  potluckItems: { type: Array, required: true
  }
}, {
  timestamps: true
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;