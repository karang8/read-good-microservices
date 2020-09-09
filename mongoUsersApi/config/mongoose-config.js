/* eslint-disable global-require */
/* eslint-disable no-console */

const mongoose = require('mongoose');

function startConnection() {
  console.log();
  const uri = "mongodb+srv://karan:mountbluemongo787@cluster0-4qqxf.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri, { useNewUrlParser: true })
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  //   const collection = client.db(dbname).collection("devices");
  //   // perform actions on the collection object
  //   console.log(err);
  //   client.close();
  // });

  // const mongoose = require('mongoose');

  // mongoose.connect(`mongodb://localhost:27017/${dbname}`, { useNewUrlParser: true, useCreateIndex: true });

  // mongoose.connection.once('open', () => {
  //   console.log('Connection made');
  // }).on('error', (error) => {
  //   console.log('Connection error', error);
  // });
}

module.exports = { startConnection };
