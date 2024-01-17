const bodyparser = require("body-parser");
const express = require("express");
const dbconnect = require("./config/dbconnect");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser")
const morgan = require('morgan')
const authRouter = require("./routes/authRouter");
const {notFound, errorHandler} = require('./middlewares/errorHandler')
const productRouter = require('./routes/productRouter')

app.use(morgan("dev"))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser())
dbconnect();

app.use("/api/v1/user", authRouter);
app.use("/api/v1/product", productRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
