const express = require("express");
const ToDoModel = require("../model/ToDoModel");
const Route = express.Router();

Route.get("/", async (req, res) => {
  try {
    const result = await ToDoModel.find({});
    res.status(200).json({
      isSuccessfull: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});
Route.post("/", async (req, res) => {
  try {
    const body = req.body;
    const obj = { title: body.title };
    const result = new ToDoModel(obj);
    await result.save();
    res.status(201).json({
      isSuccessfull: true,
      message: "ToDo Added",
    });
  } catch (error) {
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});
Route.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ToDoModel.findByIdAndDelete(id);
    res.status(200).json({
      isSuccessfull: true,
      message: "ToDo Deleted",
    });
  } catch (error) {
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});
Route.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const result = await ToDoModel.findByIdAndUpdate(id, body, { new: true });
    res.status(201).json({
      isSuccessfull: true,
      message: "ToDo Added",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      isSuccessfull: false,
      error: error.message,
    });
  }
});

module.exports = Route;
