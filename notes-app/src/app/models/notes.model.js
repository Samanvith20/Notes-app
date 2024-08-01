import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
}, { timestamps: true });

export const NoteModel = mongoose.models.Note || mongoose.model('Note', NoteSchema);
