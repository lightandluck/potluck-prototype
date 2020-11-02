const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offeringSchema = new Schema({
  playerName: { type: String, required: true },
  officialName: { type: String, required: true },
  title: { type: String, required: true }, 
  description: { type: String, required: true },
  acceptableTrades: { type: Array, required: false }
}, {
  timestamps: true,
})

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;