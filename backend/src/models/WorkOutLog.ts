import mongoose, { Schema, Types } from "mongoose";

export interface ILoggedExercise {
    exercise: Types.ObjectId; // ref to Exercise
    sets: {
        reps: number;
        weight: number;
        unit: "kg" | "lb";
    }[];
    notes?: string;
}

export interface IWorkoutLog {
    user: Types.ObjectId;
    plan: Types.ObjectId; // ref to WorkoutPlan
    dayLabel: string; // e.g. "Push Day" — copied from the plan at log time
    date: Date;
    exercises: ILoggedExercise[];
}

const loggedExerciseSchema = new Schema<ILoggedExercise>({
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    sets: [{
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
        unit: { type: String, enum: ["kg", "lb"], default: "lb" },
    }],
    notes: { type: String },
}, { _id: false });

const workoutLogSchema = new Schema<IWorkoutLog>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: Schema.Types.ObjectId, ref: "WorkoutPlan", required: true },
    dayLabel: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    exercises: [loggedExerciseSchema],
}, { timestamps: true });

export default mongoose.model<IWorkoutLog>("WorkoutLog", workoutLogSchema);