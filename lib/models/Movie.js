import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  directorId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genreId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema); 