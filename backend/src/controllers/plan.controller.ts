import { Response } from 'express';
import Plan, { IWorkoutPlan } from '../models/WorkOutPlan';
import { AuthRequest } from '../middleware/auth.middleware';
import User, { IUser } from '../models/User';

// Create a new workout plan
export const createPlan = async (req: AuthRequest, res: Response) => {
    try {
        const { name, days } = req.body;
        const plan = await Plan.create({ user: req.user?._id, name, days });  // Assuming req.user is populated by the protect middleware
        res.status(201).json(plan);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to create plan";
        res.status(500).json({ message });
    }

};

// Get all workout plans for the authenticated user
export const getPlans = async (req: AuthRequest, res: Response) => {
    try {
        const plans = await Plan.find({ user: req.user?._id });
        res.status(200).json(plans);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to retrieve plans";
        res.status(500).json({ message });
    }
};

// Get a specific workout plan by ID
export const getPlanById = async (req: AuthRequest, res: Response) => {
    try {
        const plan = await Plan.findById({ _id: req.params.id, user: req.user?._id }).populate('days.exercises.exercise');
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json(plan);

    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to retrieve plan";
        res.status(500).json({ message });
    }
};

// Update a workout plan by ID
export const updatePlan = async (req: AuthRequest, res: Response) => {
    try {
        const plan = await Plan.findOneAndUpdate({
            _id: req.params.id,
            user: req.user?._id
        }, req.body,
            { new: true, runValidators: true });
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json(plan);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to update plan";
        res.status(500).json({ message });
    }
};

// Delete a workout plan by ID
export const deletePlan = async (req: AuthRequest, res: Response) => {
    try {
        const plan = await Plan.findOneAndDelete({
            _id: req.params.id,
            user: req.user?._id
        });
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.status(200).json({ message: "Plan deleted successfully" });
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to delete plan";
        res.status(500).json({ message });
    }
};

// Add a day in a workout plan
export const addDay = async (req: AuthRequest, res: Response) => {
    try {
        const plan = await Plan.findOneAndUpdate(
            { _id: req.params.id, user: req.user!._id },
            { $push: { days: req.body } },
            { new: true, runValidators: true }
        );

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        res.status(200).json(plan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add day" });
    }
};