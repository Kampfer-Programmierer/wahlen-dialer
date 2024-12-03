const mongoose = require("mongoose");

const callLogSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  startTime: {
    type: String, // Format: HH:mm:ss
    required: true,
  },
  endTime: {
    type: String, // Format: HH:mm:ss
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  callStatus: {
    type: String,
    enum: ["connected", "missed", "dropped"],
    required: true,
  },
  recordingUrl: {
    type: String,
    default: null,
  },
  disposition: {
    type: String,
    enum: ["interested", "not interested", "call later"],
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CallLog = mongoose.model("CallLog", callLogSchema);

module.exports = CallLog;
