const mongoose = require("mongoose");
const User = require("../models/User");
const config = require("./config");

//Clear test DB and init with admin user
const clearTestDB = async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  const email = config.ADMIN_EMAIL;
  const password = config.ADMIN_PASSWORD;
  const role = "admin";
  const userExists = await User.findOne({ email });
  if (userExists) {
    return;
  }
  const user = new User({
    email,
    role,
    password,
  });
  await user.save(user);
};

module.exports = clearTestDB;
