const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eeauc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('gtour');
        const toursCollection = database.collection('tour')

        app.get('/tour', async (req, res) => {
            const cursor = toursCollection.find({})
            const tours = await cursor.toArray();
            res.send(tours);
        })
    }

    finally {
        // await client.close()
    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello G-Tour!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})


// https://detour.hibootstrap.com/images/tour/feature-tour-6.jpg
// https://detour.hibootstrap.com/images/tour/feature-tour-5.jpg
// https://detour.hibootstrap.com/images/tour/feature-tour-4.jpg
// https://detour.hibootstrap.com/images/tour/feature-tour-3.jpg
// https://detour.hibootstrap.com/images/tour/feature-tour-2.jpg
// https://detour.hibootstrap.com/images/tour/feature-tour-1.jpg