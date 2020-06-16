const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// setup body parsing
app.use(bodyParser.json());

// load routes
const pagesRoute = require('./routes/pages/pages');
const apiRoute = require('./routes/api/api');


app.use('/api/', apiRoute);
app.use('/', pagesRoute);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("server running on " + PORT)
})