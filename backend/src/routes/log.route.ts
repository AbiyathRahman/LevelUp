import { Router } from "express";
import { createLog, getLogs, getLogById, getLogsByPlanId, deleteLog } from "../controllers/log.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post('/', protect, createLog);
router.get('/', protect, getLogs);
router.get('/:id', protect, getLogById);
router.get('/plan/:planId', protect, getLogsByPlanId);
router.delete('/:id', protect, deleteLog);

export default router;