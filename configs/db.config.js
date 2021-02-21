const mongoose = require('mongoose');
const process = require('process');
require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, { // TODO: name db on .env I
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`MongoDB is Ready! DB Name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

process.on("SIGINT", () => {
  mongoose.connection
    .close()
    .then(() => console.log("Successfully disconnected from the DB"))
    .catch((e) => console.error("Errro disconnecting from the DB", e))
    .finally(() => process.exit());
});