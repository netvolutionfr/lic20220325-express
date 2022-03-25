const express = require('express');
const mongo = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/';
app.use(cors());

let db, restaurants

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return
    }
    db = client.db("new_york");
    restaurants = db.collection("restaurants");
  }
);
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/restaurants', (req, res) => {
    restaurants.find({"borough": "Brooklyn", "cuisine": "Italian", "address.street": "5 Avenue"}).toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500).json({err: err});
            return
        }
        res.status(200).json({restaurants: items});
    });
});

app.listen(port, () => { console.log(`Listening on port ${port}`); });