const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  type: {
    type: String,
    enum: ["sick", "vacation", "unpaid"],
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  morning: {
    type: Boolean,
    required: true,
  },
  afternoon: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
});

module.exports = mongoose.model("Leave", LeaveSchema);
