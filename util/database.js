const { MongoClient } = require("mongodb");

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://lakshmikanth:MongoDB0910@cluster0.puarb.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No database found!!!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;