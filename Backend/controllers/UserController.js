const Employee = require("../models/Employee");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//signup
const signUp = async (req, res, next) => {
  const { email, password, firstName, lastName, userName, organization, role } =
    req.body;

  let user;
  try {
    user = new User({
      email,
      password,
      firstName,
      lastName,
      userName,
      organization,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(data, "tax", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        name: firstName,
        id: user.id,
        role: user.role,
        organization: user.organization,
        user: user,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//login
const login = async (req, res, next) => {
  ("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "No user found for this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Email and password does not match",
      });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    user.password = undefined;
    jwt.sign(data, "tax", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        role: user.role,
        organization: user.organization,
        user: user,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//add Employee
const addEmployee = async (req, res, next) => {
  try {
    const employee = User.findById(req.user.id);

    const newEmployee = new Employee({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      income: req.body.income,
      deduction: req.body.deduction,
      image: req.user.image,
    });

    await employee.updateOne({
      $push: { employees: [newEmployee] },
    });
    await newEmployee.save();
    res.status(200).json("Employee Added");
  } catch (err) {
    res.status(500).json(err);
  }
};

//get employees
const getEmployees = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("employees");

    return res.status(200).json(user.employees);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//get employee
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update employee
const updateEmployee = async (req, res, next) => {
  const { firstName, lastName, income, deduction } = req.body;
  const id = req.params.id;
  const role = req.user.role;
  let employee;

  try {
    employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ msg: "Cannot find a employee for this id" });
    }
    if (role === "ct") {
      (employee.firstName = firstName),
        (employee.lastName = lastName),
        (employee.income = income),
        (employee.deduction = deduction);

      await employee.save();
      // await employee.updateOne({ $set: req.body });

      return res.status(202).json({
        msg: "Employee updated successfully",
        employee,
      });
    }

    return res.status(404).json({
      msg: "You don't have access to perform this task",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//delete employee
const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const userRole = req.user.role;

  try {
    let employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ msg: "Cannot find a employee for this id" });
    }
    if (userRole === "ct") {
      await employee.remove();

      return res.status(200).json({ msg: "Employee removed successfully" });
    }

    return res.status(404).json({
      msg: "You don't have access to perform this task",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//update profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await Employee.findById(req.body.id);

    await user.updateOne({ $set: req.body });
    res.status(200).json("Profile has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

//getprofile
const getProfile = async (req, res, next) => {
  try {
    const user = await Employee.findById(req.params.id)
      .populate("posts")
      .populate({ path: "posts", populate: { path: "user" } });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const uploadProfilePic = async (req, res, next) => {
  const { image } = req.body;
  "uploading", image;
  const userId = req.user.id;
  try {
    let surgeUser = await Employee.findById(userId);
    surgeUser.image = image;
    await surgeUser.save();
    return res.status(200).json({ msg: "profile picture updated" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await Employee.find().populate();

    return res.status(200).json({ msg: "user Found", users });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

exports.signUp = signUp;
exports.login = login;
exports.addEmployee = addEmployee;
exports.getEmployees = getEmployees;
exports.getEmployeeById = getEmployeeById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;

exports.updateProfile = updateProfile;
exports.getProfile = getProfile;
exports.uploadProfilePic = uploadProfilePic;
exports.getUsers = getUsers;
