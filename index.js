const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// 32KKNhwAqNj8Uqel



const uri = "mongodb+srv://userdb1:32KKNhwAqNj8Uqel@cluster0.w2flw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const usersCollection = client.db("foodExpress").collection("user");

        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);
            const user = await cursor.toArray();
            res.send(user);
        });
        // Update User
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });
        // create a document to insert
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
            console.log(result);
        });

        //User delete
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})