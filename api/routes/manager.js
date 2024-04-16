const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

//SCHEMA
const Employee = require("../schema/Employee");
const countNonWeekendDays = require("../misc/countNonWeekendDays");
const Leave = require("../schema/Leave");

//MIDLEWARE
router.use(express.json());
router.use(cookieParser());

const authenticateManagerToken = require("../middleware/authenticateManagerToken");
router.use(authenticateManagerToken);

router.get("/employees", async (req, res) => {
  let employees = await Employee.aggregate([
    {
      $lookup: {
        from: "leaves",
        localField: "_id",
        foreignField: "employee_id",
        as: "leaves",
      },
    },
    {
      $unset: ["password"],
    },
  ]);
  //   add duration
  employees.forEach((employee) => {
    employee.leaves.forEach((leave) => {
      leave.duration = countNonWeekendDays(
        leave.start_date,
        leave.end_date,
        leave.afternoon || leave.morning
      );
    });
  });

  res.json(employees);
});

//approve leave
router.patch("/leaves/:id/approve", async (req, res) => {
  let leave = await Leave.findById(req.params.id);
  leave.status = "approved";
  leave.save();
  res.json(leave);
});

//reject leave
router.patch("/leaves/:id/reject", async (req, res) => {
  let leave = await Leave.findById(req.params.id);
  leave.status = "rejected";
  leave.save();
  res.json(leave);
});

module.exports = router;
