const router = require('express').Router();
let Seed = require('../models/seed.model');


// TODO:  Figure out logic of which seed we need to get, 
//        but right now just assuming there's only one in database
router.route('/').get((req, res) => {
  Seed.findOne()
    .then(seed => res.json(seed))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const counter = req.body.counter;
  const newSeed = new Seed({counter});

  newSeed.save() 
    .then(() => res.json('Seed added. Counter starting at: ' + req.body.counter.toString()))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Seed.findById(req.params.id)
    .then(seed => {
      seed.counter += 1;
      seed.save()
        .then(seed => res.json('Counter incremented to: ' + seed.counter.toString()))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;