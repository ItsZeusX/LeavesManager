const Employee = require("../../schema/Employee");
const countNonWeekendDays = require("../countNonWeekendDays");

async function getEmployees(req) {
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

  return employees;
}

module.exports = getEmployees;
