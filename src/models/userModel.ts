import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'
const ROLES = ['admin', 'student'] as const;

export interface IUser extends Document {
    name: string;
    email: string;
    department: string;
    password: string;
    role: (typeof ROLES)[number];
    comparePassword(candidatePassword: string): Promise<boolean>; 
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    department: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
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

const User = mongoose.model<IUser>('User', UserSchema);
export default User;