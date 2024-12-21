const mongoose = require("mongoose");
const employeeModel = require("../Models/employeeModel");

module.exports.AddEmployee = async (req, res) => {
  console.log("Data from req", req.body);

  try {
    const isExist = await employeeModel.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(400).json({ message: "Employee Already Exists" });
    } else {
      const newEmployee = new employeeModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        department: req.body.department,
        designation: req.body.designation,
        dateofjoining: req.body.dateofjoining,
        salary: req.body.salary,
      });

      await newEmployee.save();

      return res.status(201).json({ message: "Employee Added Successfully" });
    }
  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.EmployeebyID = async (req, res) => {
  try {
    const employee = await employeeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.AllEmployee = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.searchEmployees = async (req, res) => {
  try {
    const { name, designation } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (designation) {
      query.designation = designation;
    }

    const employees = await employeeModel.find(query);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    return res.status(200).json({
      message: "Employee Updated Successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await employeeModel.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    return res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
