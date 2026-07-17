import express from "express";
import {
    getDashboardStats,
    getMyProfile,
    updateMyProfile,
   
} from "../controllers/employeeController.js";
import { authMiddleware, checkRole } from "../middlewares/authmiddleware.js";
import { UserRole } from "../models/userModel.js";


const router = express.Router();


router.get("/me", authMiddleware, getMyProfile);

router.put("/me",authMiddleware,updateMyProfile);
router.get( "/dashboard",authMiddleware, checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER), getDashboardStats);


export default router;