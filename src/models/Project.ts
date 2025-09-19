import mongoose, { Document, Schema } from 'mongoose';

// ...existing code...

export interface IProject extends Document {
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  assignedTo: mongoose.Types.ObjectId;
  company_id: mongoose.Types.ObjectId;
  team: { user: mongoose.Types.ObjectId; role: string }[];
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'completed', 'on_hold'], default: 'active' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  company_id: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  team: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, role: { type: String } }],
  deadline: { type: Date },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);