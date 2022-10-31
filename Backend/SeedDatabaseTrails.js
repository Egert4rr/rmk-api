const { faker } = require('@faker-js/faker');
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;


async function seedDB() {
    // Connection URL
    const uri = process.env.DBCONNECTIONSTRING;
    const counties = ["Harjumaa","Hiiumaa","Ida-Virumaa","Jõgevamaa", "Järvamaa",  "Läänemaa", 
    "Lääne-Virumaa",  "Põlvamaa",  "Pärnumaa",  "Raplamaa",  "Saaremaa",  "Tartumaa",
    "Valgamaa",  "Viljandimaa",  "Võrumaa"]   

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log("Connected correctly to server");

        let trailCollection;
        try {
            trailCollection = await client.db().collection("trails");
            await trailCollection.drop();
        }
        catch {
            
        }

        // make a bunch of time series data

        let trails = [];
        for (let index = 0; index < 100; index++) {
            const title = faker.name.fullName();
            const distance = faker.random.numeric(2) + " km"
            const location =  faker.address.streetAddress(false)
            const region = counties[Math.floor(Math.random() * 14)]
            const picture =  faker.image.abstract(640,480,true)
            const tags = [{telkimisvõimalus:faker.datatype.boolean(),kattegaLõke:faker.datatype.boolean(),lõkkekoht:faker.datatype.boolean()}]
            const description = faker.lorem.paragraph()

            let trail = {
                title: title,
                distance: distance,
                location: location,
                region: region,
                picture: picture,
                tags:tags,
                description:description
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
        