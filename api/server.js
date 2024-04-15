const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//SCHEMA
const Employee = require("./schema/Employee");
//ROUTERS
const employeesRouter = require("./routes/employees");
const managerRouter = require("./routes/manager");
app.use("/api/employees", employeesRouter);
app.use("/api/manager", managerRouter);
//MIDDLEWARE
const authenticateToken = require("./middleware/authenticateToken");
app.use(express.json());
app.use(cookieParser());

//* Connect to MongoDB -------------------------------------------------------
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });
//* ------------------------------------------------------------------------------

//? AUTHENTICATION ------------------------------------------------------------------------------
// Login route to generate JWT
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Employee.findOne({ email, password });
  if (user) {
    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        email: email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
      },
      process.env.SECRET_TOKEN
    );
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Logout route to clear JWT
app.get("/api/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logout successful" });
});

//authenticate
app.get("/api/authenticate", authenticateToken, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
    role: req.user.role,
  });
});
//? ----------------------------------------------------------------------------------------------

app.listen(3000, () => {
  console.log("Server is running on port : " + PORT);
});
