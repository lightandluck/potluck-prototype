const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let uri = process.env.LOCAL_URI;
if (process.env.NODE_ENV === 'production') {
  uri = process.env.ATLAS_URI;
}

// TODO: Figure out what all these options are and if they're needed.
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const playersRouter = require('./routes/players');
const offeringsRouter = require('./routes/offerings');
const wishlistsRouter = require('./routes/wishlists');
const seedsRouter = require('./routes/seeds');

// Creates API routes for our use: http://localhost:5000
app.use('/players', playersRouter);
app.use('/offerings', offeringsRouter);
app.use('/wishlists', wishlistsRouter);
app.use('/seeds', seedsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});