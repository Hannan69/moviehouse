import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Genre || mongoose.model('Genre', GenreSchema); 