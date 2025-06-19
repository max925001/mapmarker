import mongoose from 'mongoose';

const markerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  categories: [{ type: String, trim: true }], // Changed from 'category' to 'categories' (array)
  createdAt: { type: Date, default: Date.now },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere', // Geospatial index for proximity search
    },
  },
});

// Automatically set location.coordinates from latitude and longitude
markerSchema.pre('save', function (next) {
  this.location = {
    type: 'Point',
    coordinates: [this.longitude, this.latitude],
  };
  next();
});

export default mongoose.model('Marker', markerSchema);