const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config({path:path.resolve(__dirname, './../.env')});
const connectionString = process.env.DB_CONNECTION_STRING;

let mongodb;

function connect(callback) {
  MongoClient.connect(connectionString,{serverApi:ServerApiVersion.v1})
             .then(db => {
               mongodb = db;
               callback();
             })
             .catch(err => console.log(`error connecting with db: ${err}`));
}

function get() {
  return mongodb;
}

function close() {
  mongodb.close();
}

module.exports = { connect, get, close };
