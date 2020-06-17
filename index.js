const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/sessionconfig.json')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

// setup body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// server static files
app.use(express.static('public'));

// setup session handling
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

// load routes
const apiRoute = require('./routes/api/api');
const pagesRoute = require('./routes/pages/pages');

app.use('/api/', apiRoute);
app.use('/', pagesRoute);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("server running on " + PORT)
})