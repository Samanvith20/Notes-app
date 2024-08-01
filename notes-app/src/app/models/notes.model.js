import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
 
},{timestamps: true});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
