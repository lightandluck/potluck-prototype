const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seedSchema = new Schema({
  counter: Number
});

const Seed = mongoose.model('Seed', seedSchema);

module.exports = Seed;
