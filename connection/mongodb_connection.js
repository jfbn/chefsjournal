const mongoose = require('mongoose');
let db = mongoose.connection;
mongoose.connect(
    'mongodb://localhost:27017/chefsjournal',
    err => {
      console.log(err);
  },
);

module.exports = mongoose;