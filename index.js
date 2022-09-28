const app = require('express')();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const mongoose = require("mongoose");
const Trail = require("./Models/trailModel")
const bodyParser = require("body-parser")

app.use(cors())

require("../rmk-api/SeedDatabaseTrails")
require("../rmk-api/SeedDatabaseHikers")
require("../rmk-api/SeedDatabaseHikes")


mongoose.Promise = global.Promise
mongoose.connect(process.env.DBCONNECTIONSTRING)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require("./Routes/trailRoutes")(app)
require("./Routes/hikerRoutes")(app)
require("./Routes/hikeRoutes")(app)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>  {
    console.log(`API up at: http://localhost:${port}`)
});