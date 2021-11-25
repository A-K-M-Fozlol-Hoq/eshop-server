//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewars/common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    // useUndefinedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//not found error handling
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running at${process.env.PORT || 4000}`);
});
