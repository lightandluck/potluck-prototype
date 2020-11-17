const router = require('express').Router();
let Offering = require('../models/offering.model');
let Seed = require('../models/seed.model');

router.route('/').get((req, res) => {
  Offering.find()
    .then(offerings => res.json(offerings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const playerName = req.body.playerName;
  const playerId = req.body.playerId;
  const title = req.body.title;
  const description = req.body.description;
  
  let officialName = await generateOfficialName();
  console.log(officialName)

  const newOffering = new Offering({
    playerName,
    playerId,
    officialName,
    title,
    description
  });

  newOffering.save()
    .then((offering) => { 
      res.json(offering);
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

router.route('/byPlayerId/:id').get((req, res) => {
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
      
      offering.save()
        .then(() => res.json('Offering updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

function generateOfficialName() {
  const officialName = Seed.findOne()
    .then(seed => { 
      let name = "WAWG-" + seed.counter.toString();
      return name;
    })
  return officialName;
 };

  // let officialName = await Seed.findOne()
  //   .then(seed => { 
  //     let name = "WAWG-" + seed.counter.toString();
  //     // seed.counter += 1;
  //     // seed.save()
  //     //   .then(seed => { 
  //     //     console.log('Counter incremented to: ' + seed.counter.toString());
  //     //   })
  //     //   .catch(err => {
  //     //     // console.log(err);
  //     //   });
  //     return name;
  //   })
  //   .catch(err => {
  //     // console.log(err);
  //   });
  
  // return officialName;
// };

module.exports = router;