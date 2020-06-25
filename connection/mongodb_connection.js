const mongoose = require('mongoose');
const { local: localConfig, remote: remoteConfig } = require('../config/dbconfig.json');
const USELOCAL = process.env.USELOCAL || false;
const REMOTEADRESS = process.env.MONGODB_URI || remoteConfig.DB_ADRESS;

if(USELOCAL == true) {
  mongoose.connect(`mongodb://${localConfig.DB_ADRESS}:${localConfig.DB_PORT}/${localConfig.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => {
      console.log("connected to local db")
    }, (err) => {
      console.log("failed to connect to local db");
      console.log(err);
    });
} else {
  mongoose.connect(REMOTEADRESS, {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 2000})
  .then(() => {
    console.log("connected to remote db")
  }, 
    (err) => {
      console.log("failed to connect to remote db");
      console.log(err);
  });
}

