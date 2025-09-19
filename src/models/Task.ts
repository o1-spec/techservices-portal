import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: mongoose.Types.ObjectId;
  project_id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);