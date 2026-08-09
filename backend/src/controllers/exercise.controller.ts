import { Request, Response } from "express";
import Exercise from "../models/Exercise";

export const getExercises = async (req: Request, res: Response) => {
    try {
        const { muscle, equipment, search, category, level } = req.query;

        const filter: Record<string, any> = {};
        if (muscle) filter.primaryMuscles = muscle;
        if (equipment) filter.equipment = equipment;
        if (category) filter.category = category;
        if (level) filter.level = level;
        if (search) filter.name = { $regex: search, $options: "i" };

        const exercises = await Exercise.find(filter);
        res.status(200).json(exercises);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch exercises" });
    }
};

export const getExerciseById = async (req: Request, res: Response) => {
    try {
        const exercise = await Exercise.findById(req.params.id);

        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        res.status(200).json(exercise);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch exercise" });
    }
};