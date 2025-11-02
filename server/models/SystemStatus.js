const mongoose = require('mongoose');

const systemStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['operational', 'degraded', 'maintenance', 'outage'],
      default: 'operational',
    },
    message: String,
    services: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.SystemStatus || mongoose.model('SystemStatus', systemStatusSchema);