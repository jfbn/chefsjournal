const mongoose = require('mongoose');
const { DB_NAME, DB_PORT, DB_ADRESS } = require('../config/dbconfig.json');

mongoose.connect(`mongodb://${DB_ADRESS}:${DB_PORT}/${DB_NAME}`, err => {
      console.log(err);
  }).then( () => {
    console.log("connected to db")
  });
