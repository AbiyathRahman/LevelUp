import { Response } from 'express';
import WorkOutLog from '../models/WorkOutLog';
import { AuthRequest } from '../middleware/auth.middleware';

// Create a new workout log
export const createLog = async (req: AuthRequest, res: Response) => {
    try {
        const { plan, dayLabel, date, exercises } = req.body;
        const log = await WorkOutLog.create({ user: req.user!._id, plan: plan, dayLabel, date, exercises });
        res.status(201).json(log);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to create log";
        res.status(500).json({ message });
    }
};

// Get all workout logs for the authenticated user
export const getLogs = async (req: AuthRequest, res: Response) => {
    try {
        const logs = await WorkOutLog.find({ user: req.user!._id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to fetch logs";
        res.status(500).json({ message });
    }
};

// Get a specific workout log by ID
export const getLogById = async (req: AuthRequest, res: Response) => {
    try {
        const log = await WorkOutLog.findOne({ _id: req.params.id, user: req.user!._id }).populate('exercises.exercise');
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }
        res.status(200).json(log);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to fetch log";
        res.status(500).json({ message });
    }
};

// Get logs by plan ID for the authenticated user
export const getLogsByPlanId = async (req: AuthRequest, res: Response) => {
    try {
        const logs = await WorkOutLog.find({ plan: req.params.planId, user: req.user!._id }).sort({ date: -1 });
        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: "No logs found for this plan" });
        }
        res.status(200).json(logs);
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to fetch logs for the plan";
        res.status(500).json({ message });
    }
};

// delete a workout log by ID
export const deleteLog = async (req: AuthRequest, res: Response) => {
    try {
        const log = await WorkOutLog.findOneAndDelete({ _id: req.params.id, user: req.user!._id });
        if (!log) {
            return res.status(404).json({ message: "Log not found" });
        }
        res.status(200).json({ message: "Log deleted successfully" });
    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : "Failed to delete log";
        res.status(500).json({ message });
    }
};