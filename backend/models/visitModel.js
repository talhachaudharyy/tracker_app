import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    linkId: { type: String, required: true },
    ip: { type: String },
    location: {
      latitude: Number,
      longitude: Number
    },
    mapsLink: { type: String },
    userAgent: { type: String },
    deviceName: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Visit', visitSchema);
