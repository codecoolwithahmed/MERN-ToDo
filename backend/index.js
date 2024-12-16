require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ToDoRoute = require("./route/ToDoRoute");

const App = express();

App.use(cors());
App.use(express.json());

App.use("/todos", ToDoRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    App.listen(5000, () => console.log("server started"));
  })
  .catch((err) => console.log(err));
