const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    playerId: { type: String, required: true },
    potluckItems: [{ type: Schema.Types.ObjectId, ref: 'Offering' }]
  }, 
  { timestamps: true }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;