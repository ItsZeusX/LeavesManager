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
const countNonWeekendDays = require("../misc/countNonWeekendDays");
const getBalance = require("../misc/wrappers/getBalance");
const datesBetween = require("../misc/datesBetween");

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
//GET EMPLOYEE LEAVES ------------
router.get("/leaves", async (req, res) => {
  const leaves = await Leave.find({
    employee_id: req.user._id,
  });
  res.json(leaves);
});
//GET LEAVES DATES --------------
router.get("/leaves/dates", async (req, res) => {
  let dates = [];
  const leaves = await Leave.find({
    employee_id: req.user._id,
  });
  leaves.forEach((leave) => {
    let currentDates = datesBetween(leave.start_date, leave.end_date);
    dates = dates.concat(currentDates);
  });
  res.json(dates);
});
//ADD LEAVE ----------------------
router.post("/leaves/add", async (req, res) => {
  try {
    //? CHECK BALANCE ----------------------------------------------------------------------------------
    const duration = countNonWeekendDays(
      new Date(req.body.start_date),
      new Date(req.body.end_date),
      req.body.afternoon || req.body.morning
    );
    const balance = await getBalance(req);
    console.log(duration, balance);
    let canRequest = balance[req.body.type].available >= duration;
    if (!canRequest) {
      return res.json({
        success: false,
        error: "INSUFFICIENT_BALANCE",
        message: "You do not have enough balance to request this leave",
        data: {
          requested_days: duration,
          available_days: balance[req.body.type].available,
        },
      });
    }
    //? OVERLAP CHECK ----------------------------------------------------------------------------------
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
        success: false,
        error: "DATE_OVERLAP",
        message: "request overlaps with an existing leave",
        data: overlapResult,
      });
    } else {
      //* SUCCESS ----------------------------------------------------------------------------------
      await Leave.create({
        employee_id: req.user._id,
        ...req.body,
        status: "pending",
      });
      res.json({ success: true, message: "Leave added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to add leave", error: err });
  }
});
//DELETE LEAVE -------------------
router.post("/leaves/delete", async (req, res) => {
  try {
    await Leave.deleteOne({
      _id: req.body._id,
    });
    res.json({ success: true, message: "Leave deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: "Failed to delete leave", error: err });
  }
});



//? BALANCE ----------------------------------------------------------------------------------
router.get("/balance", async (req, res) => {
  const balance = await getBalance(req);
  res.json(balance);
});

module.exports = router;
