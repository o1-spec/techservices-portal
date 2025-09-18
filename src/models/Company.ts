import mongoose, { Document, Schema } from 'mongoose'

export interface ICompany extends Document {
  name: string
  subscription_plan?: string
  createdAt: Date
  updatedAt: Date
}

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: true
  },
  subscription_plan: {
    type: String,
    default: 'free'
  }
}, {
  timestamps: true
})

// Force model recompilation by deleting cached model
if (mongoose.models.Company) {
  delete mongoose.models.Company
}

export default mongoose.model<ICompany>('Company', companySchema)