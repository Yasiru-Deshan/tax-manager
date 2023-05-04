const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", userRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
