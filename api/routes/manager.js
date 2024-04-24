const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const exceljs = require("exceljs");
//SCHEMA
const Employee = require("../schema/Employee");
const countNonWeekendDays = require("../misc/countNonWeekendDays");
const Leave = require("../schema/Leave");

//MIDLEWARE
router.use(express.json());
router.use(cookieParser());

const authenticateManagerToken = require("../middleware/authenticateManagerToken");
const getEmployees = require("../misc/wrappers/getEmployees");
router.use(authenticateManagerToken);

//dashboard
router.get("/employees", async (req, res) => {
  let employees = await getEmployees(req);
  res.json(employees);
});

router.get("/report", async (req, res) => {
  let employees = await getEmployees(req);
  let workbook = new exceljs.Workbook();
  let worksheet = workbook.addWorksheet("Report");
  worksheet.columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Leave Type", key: "leave_type" },
    { header: "Start Date", key: "start_date" },
    { header: "End Date", key: "end_date" },
    { header: "Duration", key: "duration" },
    { header: "Status", key: "status" },
  ];
  employees.forEach((employee) => {
    employee.leaves.forEach((leave) => {
      worksheet.addRow({
        name: employee.name,
        email: employee.email,
        leave_type: leave.type,
        start_date: leave.start_date,
        end_date: leave.end_date,
        duration: leave.duration,
        status: leave.status,
      });
    });
  });

  //styling

  //TYPE
  worksheet.getColumn(3).eachCell((cell) => {
    if (cell.value) {
      cell.value = cell.value.toUpperCase();

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor:
          cell.value === "SICK"
            ? { argb: "F8CBAD" }
            : cell.value === "VACATION"
            ? { argb: "C6EFCE" }
            : { argb: "FFC7CE" },
      };
      cell.font = {
        color:
          cell.value === "SICK"
            ? { argb: "C65911" }
            : cell.value === "VACATION"
            ? { argb: "006100" }
            : { argb: "9C0006" },
      };
      cell.alignment = { horizontal: "center" };
    }
  });
  //TYPE
  worksheet.getColumn(7).eachCell((cell) => {
    if (cell.value) {
      cell.value = cell.value.toUpperCase();

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor:
          cell.value === "PENDING"
            ? { argb: "F8CBAD" }
            : cell.value === "APPROVED"
            ? { argb: "C6EFCE" }
            : { argb: "FFC7CE" },
      };
      cell.font = {
        color:
          cell.value === "PENDING"
            ? { argb: "C65911" }
            : cell.value === "APPROVED"
            ? { argb: "006100" }
            : { argb: "9C0006" },
      };

      cell.alignment = { horizontal: "center" };
    }
  });

  //header
  worksheet.getRow(1).eachCell((cell) => {
    if (cell.value) {
      cell.value = cell.value.toUpperCase();
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "000000" },
      };
      cell.font = { color: { argb: "FFFFFF" } };
      cell.alignment = { horizontal: "center" };
    }
  });

  //auto width
  worksheet.columns.forEach((column) => {
    column.width = column.header.length < 12 ? 12 : column.header.length;
  });
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  await workbook.xlsx.write(res);
  res.end();
});

//generate report

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
