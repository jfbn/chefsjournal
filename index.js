const express = require('express');
const app = express();

// load routes
const pagesRoute = require('./routes/pages/pages');
const apiRoute = require('./routes/api/api');


app.use('/api/', apiRoute);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("server running on " + PORT)
})