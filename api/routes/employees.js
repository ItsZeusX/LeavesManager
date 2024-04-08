const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

//MIDLEWARE
router.use(express.json());
router.use(cookieParser());

//SCHEMAS
const Employee = require("../schema/Employee");
const Leave = require("../schema/Leave");
const authenticateToken = require("../middleware/authenticateToken");
const checkDateRangesOverlap = require("../misc/checkDateRangesOverlap");

router.use(authenticateToken);

router.get("/", async (req, res) => {
  const employees = await Employee.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        lastname: 1,
        email: 1,
        role: 1,
      },
    },
  ]);
  res.json(employees);
});

router.post("/add", async (req, res) => {
  try {
    await Employee.create(req.body);
    res.json({ message: "Employee added successfully" });
  } catch (err) {
    res.json({ message: "Failed to add employee", error: err });
  }
});
//? LEAVES ----------------------------------------------------------------------------------
router.get("/leaves", async (req, res) => {
  const leaves = await Leave.find({
    employee_id: req.user._id,
  });
  res.json(leaves);
});

router.post("/leaves/add", async (req, res) => {
  try {
    let isOverlapping = false;
    let overlapResult = {
      total_days: 0,
      dates: [],
    };
    //get all leaves that have a greater end date than the start date of the new leave
    const leaves = await Leave.find({
      employee_id: req.user._id,
    });

    leaves.forEach((leave) => {
      const overlap = checkDateRangesOverlap(
        leave.start_date,
        leave.end_date,
        req.body.start_date,
        req.body.end_date
      );

      if (overlap.overlap) {
        isOverlapping = true;
        overlapResult.total_days += overlap.nonWeekendDays.length;
        overlapResult.dates = overlapResult.dates.concat(
          overlap.nonWeekendDays
        );
      }
    });
    if (isOverlapping) {
      return res.json({
        message: "Leave overlaps with existing leave",
        overlap: overlapResult,
      });
    } else {
      await Leave.create({
        employee_id: req.user._id,
        ...req.body,
        status: "pending",
      });
      res.json({ message: "Leave added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to add leave", error: err });
  }
});

module.exports = router;
