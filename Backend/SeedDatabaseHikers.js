const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    // Connection URL
    const uri = "mongodb://localhost:27017/trailsApiDb";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();

        const hikerCollection = await client.db("trailsApiDb").collection("hikers");
        hikerCollection.drop();

        let hikers = [];
        for (let index = 0; index < 100; index++) {
            const Name = faker.name.fullName();
            const Email = faker.internet.email();
            const Phonenumber = faker.random.numeric(Math.random(7,8))

            let hiker = {
                Name: Name,
                Email: Email,
                Phonenumber: Phonenumber
            }

            hikers.push(hiker);
        }

        await hikerCollection.insertMany(hikers);

        console.log("Hikers seeded!")
        await client.close();
    } catch (err) {
        console.log(err.stack)
    }

};

seedDB();
        