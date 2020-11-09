const router = require('express').Router();
let Offering = require('../models/offering.model');

router.route('/').get((req, res) => {
  Offering.find()
    .then(offerings => res.json(offerings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const playerName = req.body.playerName;
  const playerId = req.body.playerId;
  const officialName = req.body.officialName;
  const title = req.body.title;
  const description = req.body.description;
  const acceptableTrades = req.body.acceptableTrades;
  

  const newOffering = new Offering({
    playerName,
    playerId,
    officialName,
    title,
    description,
    acceptableTrades
  });

  newOffering.save()
    .then((offering) => { 
      res.json('Offering added!') 
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Offering.findById(req.params.id)
    .then(offering => res.json(offering))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byPlayer/:name').get((req, res) => {
  Offering.find({ "playerName": req.params.name })
    .then(offering => res.json(offering))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byId/:id').get((req, res) => {
  Offering.find({ "playerId": req.params.id })
    .then(offering => res.json(offering))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Offering.findByIdAndDelete(req.params.id)
    .then(() => res.json('Offering deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Offering.findById(req.params.id)
    .then(offering => {
      offering.playerName = req.body.playerName;
      offering.officialName = req.body.officialName;
      offering.title = req.body.title;
      offering.description = req.body.description;
      offering.acceptableTrades = req.body.acceptableTrades;
      
      offering.save()
        .then(() => res.json('Offering updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;