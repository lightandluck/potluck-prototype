const router = require('express').Router();
let Player = require('../models/player.model');

router.route('/').get((req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;

  const newPlayer = new Player({name});

  newPlayer.save()
    .then(() => res.json('Player added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;