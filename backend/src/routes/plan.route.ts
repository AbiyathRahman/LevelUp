import { Router } from 'express';
import { createPlan, getPlans, getPlanById, updatePlan, deletePlan } from '../controllers/plan.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/', protect, createPlan);
router.get('/', protect, getPlans);
router.get('/:id', protect, getPlanById);
router.put('/:id', protect, updatePlan);
router.delete('/:id', protect, deletePlan);

export default router;