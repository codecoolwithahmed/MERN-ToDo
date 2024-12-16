const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});
const ToDoModel = mongoose.model("ToDoS", ToDoSchema);
module.exports = ToDoModel;
