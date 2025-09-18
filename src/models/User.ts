import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'Admin' | 'Manager' | 'Employee'
  company_id: mongoose.Types.ObjectId
  isEmailVerified: boolean
  emailVerificationToken?: string
  emailVerificationExpires?: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  isActive: boolean
  lastLogin?: Date
  profileVisibility?: "public" | "team" | "private"
  theme?: "light" | "dark" | "system"
  language?: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Employee'],
    default: 'Employee'
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String
  },
  emailVerificationExpires: {
    type: Date
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  profileVisibility: {
    type: String,
    enum: ["public", "team", "private"],
    default: "team"
  },
  theme: {
    type: String,
    enum: ["light", "dark", "system"],
    default: "light"
  },
  language: {
    type: String,
    default: "en"
  }
}, {
  timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Force model recompilation by deleting cached model
if (mongoose.models.User) {
  delete mongoose.models.User
}

export default mongoose.model<IUser>('User', userSchema)