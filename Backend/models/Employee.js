const mongoose = require("mongoose");
const EmployeeSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
  },
  password: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
  },
  position: {
    type: String,
  },
  role: {
    type: String,
    default: "employee",
  },
  income: {
    type: Number,
  },
  deduction:{
    type: Number,
  }
  
});

module.exports = mongoose.model("Employee", EmployeeSchema);
