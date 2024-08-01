import mongoose from 'mongoose';

 export const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
},{timestamps: true});

 export const groupmodel= mongoose.models.Group || mongoose.model('Group', GroupSchema);
