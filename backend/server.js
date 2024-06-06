const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const dbName = "PastFortress";
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
client.connect();

// Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//Save the passwords
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({success: true, result: findResult}); 
});

//Delete a password by id
app.delete("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult}); 
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
