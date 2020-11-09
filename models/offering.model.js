const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO: Probably remove acceptableTrades field
const offeringSchema = new Schema({
  playerName: { type: String, required: true },
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true},
  officialName: { type: String, required: true },
  title: { type: String, required: true }, 
  description: { type: String, required: true },
  acceptableTrades: { type: Array, required: false }
}, {
  timestamps: true,
})

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;