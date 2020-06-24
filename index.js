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

const PORT = process.env.PORT || 8080;

server.listen(8080);

