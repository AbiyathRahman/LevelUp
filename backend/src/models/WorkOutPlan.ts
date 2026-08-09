import mongoose, { Document, Schema, Types } from "mongoose";

export interface IWorkoutPlan {
    user: Types.ObjectId;
    name: string;
    days: {
        day: string;
        exercises: {
            exercise: Types.ObjectId;
            sets: number;
            reps: number;
        }[];
    }[];
}

export type WorkoutPlanDocument = IWorkoutPlan & Document;

const workoutPlanSchema = new Schema<IWorkoutPlan>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    days: [
        {
            day: { type: String, required: true },
            exercises: [
                {
                    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
                    sets: { type: Number, required: true },
                    reps: { type: Number, required: true },
                },
            ],
        },
    ],
}, { timestamps: true });

export default mongoose.model<IWorkoutPlan>("WorkoutPlan", workoutPlanSchema);