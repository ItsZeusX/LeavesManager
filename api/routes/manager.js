const express = require("express");
const authenticateManagerToken = require("../middleware/authenticateManagerToken");
const router = express.Router();

//SCHEMA
const Employee = require("../schema/Employee");
const countNonWeekendDays = require("../misc/countNonWeekendDays");

// router.use(authenticateManagerToken);

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

module.exports = router;
