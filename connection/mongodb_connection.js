const mongoose = require('mongoose');
const { local, remote } = require('../config/dbconfig.json');
const useLocal = process.env.USELOCAL;

if(useLocal) {
  mongoose.connect(`mongodb://${local.DB_ADRESS}:${local.DB_PORT}/${local.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err){
      console.log("error: " + err);
    }      
    }).then( () => {
      console.log("connected to local db")
    });
} else {
  mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err){
      console.log(err);
    }      
    }).then( () => {
      console.log("connected to remote db")
    });
}

