import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt'

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const ROLES = ['admin', 'student'] as const;

export interface IUser extends Document {
    name: string;
    email: string;
    department?: string;
    password: string;
    role: (typeof ROLES)[number];
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    department: { type: String },
    password: { type: String, required: true, minlength: 5 },
    role: { type: String, enum: ROLES, required: true },
});


UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error: unknown) {  
      if (error instanceof Error) {
        next(error);  
      } else {
        next(new Error('Unknown error during password hashing'));  // Handle unexpected errors
      }
    }
  });

  UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.model<IUser, Model<IUser, {}, IUserMethods>>('User', UserSchema);
export default User;