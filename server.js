const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;

const BisectionAPI = require("./Api/BisectionAPI");
app.use("/", BisectionAPI);
/*
const TaylorAPI = require("./Api/TaylorAPI");
app.use("/", TaylorAPI);*/

  
app.listen(port, () => console.log("Backend server live on " + port));
module.exports = app;