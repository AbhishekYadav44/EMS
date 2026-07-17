import express from "express";
import {
    createEmployee,
    getMyProfile,
    updateMyProfile,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getDeletedEmployees,
    restoreEmployee,
    permanentDeleteEmployee,

} from "../controllers/employeeController.js";

import { authMiddleware, checkRole } from "../middlewares/authmiddleware.js";
import { UserRole } from "../models/userModel.js";

const router = express.Router();

router.post("/", authMiddleware, checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER), createEmployee);

router.get("/", authMiddleware, checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER), getEmployees);

router.get("/deleted",authMiddleware,checkRole(UserRole.SUPER_ADMIN),getDeletedEmployees);
router.patch( "/:id/restore",authMiddleware, checkRole(UserRole.SUPER_ADMIN),restoreEmployee);
router.delete("/:id/permanent",authMiddleware,checkRole(UserRole.SUPER_ADMIN), permanentDeleteEmployee)

router.get("/:id", authMiddleware, checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER), getEmployeeById);

router.put("/:id", authMiddleware, checkRole(UserRole.SUPER_ADMIN, UserRole.HR_MANAGER), updateEmployee);

router.delete("/:id", authMiddleware, checkRole(UserRole.SUPER_ADMIN), deleteEmployee);


export default router;