const mongoose = require('mongoose');
const { local, remote } = require('../config/dbconfig.json');



mongoose.connect(`mongodb://${local.DB_ADRESS}:${local.DB_PORT}/${local.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if(err){
    console.log(err);
  }      
  }).then( () => {
    console.log("connected to db")
  });
