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
        console.log("Connected correctly to server");

        const trailCollection = await client.db("trailsApiDb").collection("trails");
        trailCollection.drop();

        // make a bunch of time series data

        let trails = [];
        for (let index = 0; index < 100; index++) {
            const title = faker.name.fullName();
            const distance = faker.random.numeric(2) + " km"
            const location =  faker.address.streetAddress(false)
            const region =  faker.address.county()
            const picture =  faker.image.abstract()

            let trail = {
                title: title,
                distance: distance,
                location: location,
                region: region,
                picture: picture
            }

            trails.push(trail);
        }
        await trailCollection.insertMany(trails);

        console.log("Trails seeded!")
        await client.close();
    }
    catch(err){
        console.log(err.stack)
    }
};

seedDB();
        