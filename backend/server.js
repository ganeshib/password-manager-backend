const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const cors = require('cors');

dotenv.config();



const url = 'mongodb://127.0.0.1:27017';  // Updated to use IPv4
const client = new MongoClient(url);

const dbName = 'passop';
const app = express();
const port = 3000;

client.connect()
console.log('Connected successfully to MongoDB');

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

app.post('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true,result:findResult});
});

app.delete('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true,result:findResult});
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

