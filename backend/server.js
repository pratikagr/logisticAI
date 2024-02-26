require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 5000;
const app = express();
const Coordinate = require('./Model/coordinate');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error." + err);
    process.exit();
});

app.get('/', async (req, res) => {
    res.status(200).send({message: "Welcome to LogisHelp backend!"})
});

app.get('/fetchCoordinates', async (req, res) => {
  let coordinates = await Coordinate.find(req.query);
  let coordinatesArr = [];
  coordinates.map((item, ind) => {
    coordinatesArr.push({
      id: ind+1,
      name: item.name,
      description: item.name + " from " + item.state + ". Founded on : " + item.founded,
      latitude: item.latitude,
      longitude: item.longitude
    });
  });
  res.status(200).send(coordinatesArr);
});


app.listen(PORT, () => console.log('Server running on '+PORT));
