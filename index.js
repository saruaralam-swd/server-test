const express = require('express');
const app = express();
require('colors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0269g6x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const pictureCollection = client.db('serverTest').collection("pictures");

    app.get('/pictures', async (req, res) => {
      const query = {};
      const result = await pictureCollection.find(query).toArray();
      res.send(result)
    });
  }
  finally {

  }
};

run().catch(error => console.log(error.message));

app.get('/', (req, res) => {
  res.send('Server test running')
})

app.listen(port, () => {
  console.log(`server running on the port ${port}`.cyan)
})

module.exports = app;