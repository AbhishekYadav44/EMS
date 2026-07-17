import type { Request, Response } from "express";
import User, { UserRole } from "../models/userModel.js";


const hasCircularReporting = async (employeeId: string, managerId: string) => {

    let currentManager = await User.findById(managerId);

    while (currentManager) {

        if (currentManager._id.toString() === employeeId) {
            return true;
        }

        if (!currentManager.reportingManager) {
            return false;
        }

        currentManager = await User.findById(
            currentManager.reportingManager
        );
    }

    return false;
};

export const assignManager = async (req: Request, res: Response) => {

    try {

        const id = req.params.id as string;
        const { managerId } = req.body;


        if (id === managerId) {
            return res.status(400).json({
                success: false,
                message: "Employee cannot be own manager"
            });
        }



        const employee = await User.findOne({
            _id: id,
            isDeleted: false
        }).select("-password -__v")
        const manager = await User.findOne({
            _id: managerId,
            isDeleted: false,
        });
        if (!manager || manager.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Manager not found"
            });
        }

        if (
            manager.role !== UserRole.SUPER_ADMIN &&
            manager.role !== UserRole.HR_MANAGER
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid manager role"
            });
        }


        if (!employee || !manager) {
            return res.status(404).json({
                success: false,
                message: "Employee or manager not found"
            });
        }

        const isCircular = await hasCircularReporting(
            id,
            managerId
        );

        if (isCircular) {
            return res.status(400).json({
                success: false,
                message: "Circular reporting is not allowed"
            });
        }

        employee.reportingManager = manager._id;

        await employee.save();


        return res.status(200).json({
            success: true,
            message: "Manager assigned successfully",
            employee
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

export const getReportees = async (req: Request, res: Response) => {

    try {

        const id = req.params.id as string;


        const manager = await User.findById(id).select("-password -__v");

        if (!manager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found"
            });
        }


        const reportees = await User.find({ reportingManager: id, isDeleted: false }).select("-password -__v")


        return res.status(200).json({
            success: true,
            manager: manager.name,

            reportees: reportees.map(emp => ({
                id: emp._id,
                name: emp.name,
                email: emp.email
            }))
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


export const getOrganizationTree = async (req: Request, res: Response) => {

    try {

        const employees = await User.find({ isDeleted: false }).select("-password")

            .lean();

        const employeeMap = new Map();

        employees.forEach((employee) => {
            employeeMap.set(employee._id.toString(), {
                ...employee,
                children: []
            });
        });

        const tree: any[] = [];

        employees.forEach((employee) => {

            const currentEmployee = employeeMap.get(employee._id.toString());

            if (employee.reportingManager) {

                const manager = employeeMap.get(
                    employee.reportingManager.toString()
                );

                if (manager) {
                    manager.children.push(currentEmployee);
                }

            } else {

                tree.push(currentEmployee);

            }

        });
        const formatTree = (employee: any): any => ({
            id: employee._id,
            name: employee.name,
            designation: employee.designation,
            department: employee.department,
            role: employee.role,
            children: employee.children.map(formatTree)
        });

        return res.status(200).json({
            success: true,
            tree: tree.map(formatTree)
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};