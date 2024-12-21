const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  dateofjoining: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  photo: {
    type: String,
    required: false,
    trim: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
