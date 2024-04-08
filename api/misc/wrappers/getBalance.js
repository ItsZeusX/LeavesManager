const { listenerCount } = require("../../schema/Employee");
const Leave = require("../../schema/Leave");
const countNonWeekendDays = require("../countNonWeekendDays");

async function getBalance(req) {
  const leaves = await Leave.find({
    employee_id: req.user._id,
  });

  const balance = {
    sick: {
      allowance: 60,
      used: 0,
      available: 0,
    },
    vacation: {
      allowance: 18,
      used: 0,
      available: 0,
    },
    unpaid: {
      allowance: 365,
      used: 0,
      available: 0,
    },
  };
  
  leaves.forEach((leave) => {
    let duration = countNonWeekendDays(
      leave.start_date,
      leave.end_date,
      leave.afternoon || leave.morning
    );

    balance[leave.type].used += duration;
  });

  for (let type in balance) {
    balance[type].available = balance[type].allowance - balance[type].used;
  }
  return balance;
}

module.exports = getBalance;
