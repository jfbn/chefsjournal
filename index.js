const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const config = require('./config/sessionconfig.json')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// prepare for sockets
io.on('connection', (socket) => {

    socket.on('chat message', msgobject => {
        io.emit('chat message', msgobject);
    });

    socket.on('is writing', () => {
        console.log("someone is typing");
        socket.broadcast.emit('user typing');
    })

    socket.on('stop typing', () => {
        console.log("someone stopped typing");
        io.emit('stop typing');
    })

})

// setup body parsing to convert js objects into proper json
app.use(bodyParser.json());
// url encoded to read html form data
app.use(bodyParser.urlencoded({ extended: true }))

// server static files
app.use(express.static('public'));

// setup session handling
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    // store is a mongodb collection that keeps track of sessions
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}))

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// rate limiter to prevent being run over
const ApiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    // 150 requests each 5 minutes
    max: 150
});
const AuthLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    // 15 requests each 5 minutes
    max: 15
});
app.use('/api/', ApiLimiter);
app.use('/auth/', AuthLimiter);

// load routes
const apiRoute = require('./routes/api/api');
const pagesRoute = require('./routes/pages/pages');

app.use('/api/', apiRoute);
app.use('/', pagesRoute);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Express is ready at port " + PORT);
});

