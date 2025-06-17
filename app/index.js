//Get env values through config
require("dotenv").config();
const config = require("./utils/config");
//Express
const express = require("express");
//Route files
const articles = require("./routes/articles");
const users = require("./routes/users");
const login = require("./routes/login");
const feed = require("./routes/feed");
//Logging
const morgan = require("morgan");
const passport = require("passport");
//Connection to mongoDB
const connectMongoDB = require("./db/mongodb");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//Middleware
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
//User model for admin creation
const User = require("./models/User");
//Add cors
const cors = require("cors");
//Initialize app
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.disable("etag");
app.use(express.urlencoded({ extended: false }));
//Use session cookies with max age of 100 minutes
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 6000000 },
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: config.MONGODB_URI,
      collection: "passport-sessions",
    }),
  })
);
app.use(passport.authenticate("session"));

// routes
app.use("/api/users", users);
app.use("/api/articles", articles);
app.use("/api/feed", feed);
app.use("/api/login", login);
// middleware for error handling and unknown routes
app.use(notFound);
app.use(errorHandler);
//start after connecting to mongodb
const start = async () => {
  try {
    await connectMongoDB(config.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};
//Create admin user with details from .env
const createAdmin = async (req, res) => {
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
createAdmin();
start();

module.exports = app;
