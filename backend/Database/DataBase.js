const mongoose = require("mongoose");

const connectDataBase = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDb Connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = connectDataBase;
