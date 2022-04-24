const { EventEmitter } = require("events");
const { MongoClient } = require("mongodb");

class MongoConnect extends EventEmitter {
  constructor() {
    super();
    this.mongoClient = new MongoClient(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  connect() {
    this.mongoClient.connect((err, mongodb) => {
      if (err) throw err;
      console.log("Connessiona al DB ok");
      MongoConnect.tridentDB = mongodb.db("trident");
      this.emit("dbConnection");
    });
  }
}

module.exports = MongoConnect;
