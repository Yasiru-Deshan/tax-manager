const express = require("express");
const {
  signUp,
  login,
  updateProfile,
  getProfile,
  uploadProfilePic,
  addEmployee,
  getUsers,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/UserController");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.post("/login", login);
router.post("/", signUp);
router.put("/edit", Authentication, updateProfile);
router.get("/profile/:id", Authentication, getProfile);
router.put("/profileimage", Authentication, uploadProfilePic);
router.get("/users", Authentication, getUsers);
router.post("/add", Authentication, addEmployee);
router.get("/all", Authentication, getEmployees);
router.get("/:id", Authentication, getEmployeeById);
router.put("/update/:id", Authentication, updateEmployee);
router.delete("/delete/:id", Authentication, deleteEmployee);

module.exports = router;
