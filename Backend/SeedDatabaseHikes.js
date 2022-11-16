const { faker } = require('@faker-js/faker');
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;


async function seedDB() {
    const counties = ["Harjumaa","Hiiumaa","Ida-Virumaa","Jõgevamaa", "Järvamaa",  "Läänemaa", 
    "Lääne-Virumaa",  "Põlvamaa",  "Pärnumaa",  "Raplamaa",  "Saaremaa",  "Tartumaa",
    "Valgamaa",  "Viljandimaa",  "Võrumaa"]   

    // Connection URL
    const uri = process.env.DBCONNECTIONSTRING;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        
        let hikeCollection
        try {
            hikeCollection = await client.db().collection("hikes");
            await hikeCollection.drop();
        }
        catch {
            
        }

        let hikes = [];
        for (let index = 0; index < 100; index++) {
            const Name = faker.name.fullName();
            const Organizer = faker.name.fullName();
            const OrganizerEmail = faker.internet.email();
            const PlannedTrails =  [];
            const Regions = [counties[Math.floor(Math.random() * 14)],"Harjumaa"]
            const StartDate = faker.date.between(faker.date.between())
            const Startinglocation = faker.address.streetAddress(false);
            

            let hike = {
                Name: Name,
                Organizer: Organizer,
                OrganizerEmail: OrganizerEmail,
                Regions: Regions,
                PlannedTrails: PlannedTrails,
                StartDate: StartDate,
                Startinglocation: Startinglocation,
            }

            hikes.push(hike);
        }

        await hikeCollection.insertMany(hikes);

        console.log("Hikes seeded!")
        await client.close();
    } catch (err) {
        console.log(err.stack)
    }
};

seedDB();
        