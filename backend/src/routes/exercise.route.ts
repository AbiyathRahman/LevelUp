import { Router } from "express";
import { getExercises, getExerciseById } from "../controllers/exercise.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, getExercises);
router.get("/:id", protect, getExerciseById);

export default router;