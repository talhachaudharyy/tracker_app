import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  linkId: String,
  ip: String,
  location: Object,
  mapsLink: String,
  userAgent: String,
  deviceName: String
}, { timestamps: true });

export default mongoose.model('Visit', visitSchema);
