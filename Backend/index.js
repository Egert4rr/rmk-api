const app = require('express')();
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



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Views/index.html'));
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/Views/SignUp.html'));
})

app.listen(port, () =>  {
    console.log(`API up at: http://localhost:${port}`);
});

