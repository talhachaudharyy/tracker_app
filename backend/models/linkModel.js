import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  linkId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Link', linkSchema);
