const app = require('express')();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const mongoose = require("mongoose");
const Trail = require("./Models/trailModel")
const bodyParser = require("body-parser")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/trailsApiDb")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require("./Routes/trailRoutes")(app)
require("./Routes/hikerRoutes")(app)
require("./Routes/hikeRoutes")(app)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () =>  {
    console.log(`API up at: http://localhost:${port}`)
});