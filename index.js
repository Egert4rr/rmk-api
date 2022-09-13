const app = require('express')();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.get('/trails', (req,res) => {
    res.send(["Elva jõe", "Endla järve"])
});




app.get('/trails/:id', (req,res) => {
    res.send(["Id","Title","Distance","Location","Region","Picture"])
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(port, () =>  {
    console.log(`API up at: http://localhost:${port}`)
});