const app = require('express')();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

const trails = [
    {
        id: 1,
        title: "GAMING",
        distance: "gaming",
        location: "gaming",
        region: "gaming",
        picture: "gaming"
    },
    {
        id: 2,
        title: "CAVEMAN",
        distance: "Caveman",
        location: "Caveman",
        region: "Caveman",
        picture: "Caveman"
    }   
    
];


app.get('/trails', (req,res) => {
    res.send(trails)
});




app.get('/trails/:id', (req,res) => {
    if (!(parseInt(req.params.id) > 0)) {
        return res.status(400).send({error: "ID must be a positive integer"});
    }
    let result = trails.find(x => x.id === parseInt(req.params.id));

    if (typeof(result) === "undefined") {
        res.status(404).send({error: "trail not found"});
    }

    res.send(result);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(port, () =>  {
    console.log(`API up at: http://localhost:${port}`)
});