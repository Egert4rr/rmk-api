const { faker } = require('@faker-js/faker');
require('dotenv').config();
const utils = require('./utils')
const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    // Connection URL
    const uri = process.env.DBCONNECTIONSTRING;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();

        let hikerCollection

        try {
            hikerCollection = await client.db().collection("hikers");
            await hikerCollection.drop();
        }
        catch {

        }

        let hikers = [];
        const pass = await utils.hashPassword("admin")
        for (let index = 0; index < 100; index++) {
            const name = faker.name.fullName();
            const email = faker.internet.email();
            const phonenumber = faker.random.numeric(Math.random(7,8))
            const password = pass

            let hiker = {
                name: name,
                email: email,
                phonenumber: phonenumber,
                password: password,
                isAdmin: false
            }

            hikers.push(hiker);
        }

        let hikerAdmin = {
            name: "admin",
            email: "admin@admin.com",
            phonenumber: 5566565,
            password: await utils.hashPassword("admin"),
            isAdmin: true
        }
        hikers.push(hikerAdmin)
        let hikerTest = {
            name: "test",
            email: "test@test.com",
            phonenumber: 5566565,
            password: await utils.hashPassword("test"),
            isAdmin: false
        }
        hikers.push(hikerTest)

        await hikerCollection.insertMany(hikers);

        console.log("Hikers seeded!")
        await client.close();
    } catch (err) {
        console.log(err.stack)
    }

};


seedDB();
        