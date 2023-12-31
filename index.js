const bodyparser = require("body-parser");
const express = require("express");
const dbconnect = require("./config/dbconnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/authRouter");
const {notFound, errorHandler} = require('./middlewares/errorHandler')


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
dbconnect();

app.use("/api/v1/user", authRouter);


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
