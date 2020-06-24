const mongoose = require('mongoose');
const { local, remote } = require('../config/dbconfig.json');
const USELOCAL = process.env.USELOCAL;
console.log("HERE I AM, THE PROCESS.ENV.USELOCAL IS SET TO: "+ USELOCAL);

if(USELOCAL) {
  mongoose.connect(`mongodb://${local.DB_ADRESS}:${local.DB_PORT}/${local.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
      if(err){
        console.log("error: " + err);
      }      
    }).catch(err => {
      console.log("there was an error connecting to local db");
      console.log("the error:");
      console.log(err);
    }).then( () => {
      console.log("connected to local db")
    });
} else {
  mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
      if(err){
        console.log(err);
      }
    }).catch(err => {
      console.log("there was an error connecting to local db");
      console.log("the error:");
      console.log(err);      
    }).then( () => {
      console.log("connected to remote db")
    });
}

