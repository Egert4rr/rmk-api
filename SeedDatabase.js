const { faker } = require('@faker-js/faker');
const { json } = require('express');
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
        


        const hikeCollection = await client.db("trailsApiDb").collection("hikes");
        hikeCollection.drop();

        // make a bunch of time series data

        let hikes = [];
        for (let index = 0; index < 100; index++) {
            const Name = faker.name.fullName();
            const Organizer = faker.name.fullName();
            const OrganizerEmail = faker.internet.email();
            const PlannedTrails =  [faker.address.county()];
            const StartDate = faker.date.betweens(faker.date.betweens('2022-08-01', '2030-01-01'))
            const Startinglocation = faker.address.streetAddress(false);

            let hike = {
                Name: Name,
                Organizer: Organizer,
                OrganizerEmail: OrganizerEmail,
                PlannedTrails: PlannedTrails,
                StartDate: StartDate,
                Startinglocation: Startinglocation
            }

            hikes.push(hike);
        }
        
        await hikeCollection.insertMany(hikes);
        await trailCollection.insertMany(trails);

        console.log("Database seeded!")

        await client.close();

    }
    catch(err){
        console.log(err.stack)
    }

};

seedDB();
        