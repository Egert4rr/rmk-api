const app = require('express')();
const express = require('express')
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(cors());

require("../Backend/SeedDatabaseTrails");
require("../Backend/SeedDatabaseHikers");
require("../Backend/SeedDatabaseHikes");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DBCONNECTIONSTRING);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require("./Routes/trailRoutes")(app);
require("./Routes/hikerRoutes")(app);
require("./Routes/hikeRoutes")(app);
require("./Routes/authRoutes")(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Handling errors
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(400).send({error:err.message})
    //next(err)
})


app.use(express.static('../Frontend/public'))
app.listen(port, () =>  {
    console.log(`API up at: http://localhost:${port}`);
});

