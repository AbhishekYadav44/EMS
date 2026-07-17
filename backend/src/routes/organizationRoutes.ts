import express from "express";
import {
    assignManager,
    getReportees,
    getOrganizationTree
} from "../controllers/organizationController.js";

import { authMiddleware, checkRole } from "../middlewares/authmiddleware.js";
import { UserRole } from "../models/userModel.js";

const router = express.Router();

router.patch( "/employees/:id/manager",authMiddleware,checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER),assignManager);

router.get("/employees/:id/reportees",authMiddleware,checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER), getReportees);

router.get("/tree",authMiddleware,checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER),getOrganizationTree);

export default router;