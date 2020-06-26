const express = require('express');
const app = express();
// server for socket based chat
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const config = require('./config/sessionconfig.json')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

// prepare for sockets
io.on('connection', (socket) => {

    socket.on('chat message', msgobject => {
        io.emit('chat message', msgobject.user + ": " + msgobject.msg);
    });

    socket.on('is writing', () => {
        socket.broadcast.emit('user typing');
    })

    socket.on('stop typing', () => {
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

// rate limiter to prevent being run over
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8
});
app.use('/auth/login', limiter);
app.use('/auth/signup', limiter);
// TODO !!!!!!!!

// load routes
const apiRoute = require('./routes/api/api');
const pagesRoute = require('./routes/pages/pages');

app.use('/api/', apiRoute);
app.use('/', pagesRoute);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Express is ready at port " + PORT);
});

