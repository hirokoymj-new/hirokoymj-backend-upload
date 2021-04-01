const mongoose = require("mongoose");

module.exports.connection = async () => {
  try {
    //mongoose.set("debug", true);
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.xcz6m.mongodb.net/hirokodb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
