const { connect } = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    //Init MongoDB
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");

  } catch (err) {
    console.log(err);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
