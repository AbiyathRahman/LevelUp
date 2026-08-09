import { Router } from 'express';
import { createPlan, getPlans, getPlanById, updatePlan, deletePlan, addDay } from '../controllers/plan.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/', protect, createPlan);
router.get('/', protect, getPlans);
router.get('/:id', protect, getPlanById);
router.put('/:id', protect, updatePlan);
router.delete('/:id', protect, deletePlan);
router.patch('/:id', protect, addDay); // For partial updates

export default router;