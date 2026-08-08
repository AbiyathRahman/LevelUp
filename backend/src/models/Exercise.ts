import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
    name: string;
    force: string;
    level: string;
    equipment: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    instructions: string[];
    category: string;
    images: string[];
}

const exerciseSchema = new Schema<IExercise>({
    name: { type: String, required: true },
    force: String,
    level: String,
    equipment: String,
    primaryMuscles: [String],
    secondaryMuscles: [String],
    instructions: [String],
    category: String,
    images: [String],
});

export default mongoose.model<IExercise>('Exercise', exerciseSchema);