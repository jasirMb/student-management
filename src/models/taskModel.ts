import mongoose, { Document, Schema } from "mongoose";

export interface ITaskAssignment extends Document {
    taskName: string;         
    description: string;      
    studentId:  mongoose.Types.ObjectId;        
    dueDate: Date;             
    status: 'not-started' | 'in-progress' | 'completed'; 
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;             
    updatedAt: Date;             
}



const taskAssignmentSchema = new Schema<ITaskAssignment>({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    dueDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['not-started', 'in-progress', 'completed',], 
        default: 'not-started',
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const TaskAssignment = mongoose.model<ITaskAssignment>('TaskAssignment', taskAssignmentSchema);

export default TaskAssignment;