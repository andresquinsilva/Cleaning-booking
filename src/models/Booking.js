import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  serviceType: { type: String, enum: ['standard', 'deep', 'move-out', 'recurring'], required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, enum: ['8-10', '10-12', '12-2', '2-4', '4-6'], required: true },
  notes: { type: String },
  price: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
