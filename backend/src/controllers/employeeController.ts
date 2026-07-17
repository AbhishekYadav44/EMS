import type { Request, Response } from "express";
import User, { UserRole , UserStatus} from "../models/userModel.js";
import bcrypt from "bcrypt";


export const createEmployee = async (req: Request, res: Response) => {

    try {

        const { name, email, password, phone, department, designation, salary, role } = req.body;


        const existingEmployee = await User.findOne({ email });


        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: "Employee already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        const employee = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            department,
            designation,
            salary,
            role
        });


        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
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


export const getEmployees = async (req: Request, res: Response) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search as string;
        const department = req.query.department as string;
        const role = req.query.role as string;
        const status = req.query.status as string;

        const skip = (page - 1) * limit;

        const filter: any = {
            isDeleted: false
        };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { designation: { $regex: search, $options: "i" } }
            ];
        }

        if (department) {
            filter.department = department;
        }


        if (role) {
            filter.role = role;
        }

        if (status) {
            filter.status = status;
        }

        const totalEmployees = await User.countDocuments(filter);

        const employees = await User.find(filter)
            .select("-password -__v")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalEmployees,
            currentPage: page,
            totalPages: Math.ceil(totalEmployees / limit),
            employees
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

export const getEmployeeById = async (req: Request, res: Response) => {

    try {
        const id = req.params.id as string;
        const employee = await User.findOne({
            _id: id,
            isDeleted: false
        }).select("-password -__v");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            employee
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


export const updateEmployee = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const employee = await User.findById(id).select("-password -__v");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        const updateData = req.body;

        if (
            //@ts-ignore
            req.user.role === UserRole.HR_MANAGER && updateData.role
        ) {
            delete updateData.role;
        }


        const updatedEmployee = await User.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password -__v");


        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee: updatedEmployee
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

export const deleteEmployee = async (req: Request, res: Response) => {

    try {

        const id = req.params.id as string;
        const employee = await User.findById(id);


        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }


        //@ts-ignore
        if (req.user?.id === id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account"
            });
        }

        employee.isDeleted = true;
        await employee.save();


        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

export const getMyProfile = async (req: Request, res: Response) => {

    try {
        //@ts-ignore
        const employee = await User.findById(req.user?.id).select("-password -__v")

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
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

export const updateMyProfile = async (req: Request, res: Response) => {

    try {

        const { name, phone } = req.body;
        //@ts-ignore
        const employee = await User.findByIdAndUpdate(req.user?.id, { name, phone },
            {
                new: true,
                runValidators: true
            }
        ).select("-password -__v")


        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
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



export const getDashboardStats = async (req: Request,res: Response) => {
    try {
        const totalEmployees = await User.countDocuments({
            isDeleted: false,
        });

        const activeUsers = await User.countDocuments({
            isDeleted: false,
            status: UserStatus.ACTIVE,
        });

        const deletedEmployees = await User.countDocuments({
            isDeleted: true,
        });

        const departments = await User.distinct("department", {
            isDeleted: false,
        });

        const hrManagers = await User.countDocuments({
            role: UserRole.HR_MANAGER,
            isDeleted: false,
        });

        const superAdmins = await User.countDocuments({
            role: UserRole.SUPER_ADMIN,
            isDeleted: false,
        });

        res.status(200).json({
            success: true,
            stats: {
                totalEmployees,
                activeUsers,
                deletedEmployees,
                departments: departments.length,
                hrManagers,
                superAdmins,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


export const getDeletedEmployees = async (req: Request, res: Response) => {

    try {

        const employees = await User.find({
            isDeleted: true
        }).select("-password -__v");

        return res.status(200).json({
            success: true,
            employees
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

export const restoreEmployee = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const employee = await User.findById(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        if (!employee.isDeleted) {
            return res.status(400).json({
                success: false,
                message: "Employee is already active"
            });
        }

        employee.isDeleted = false;

        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Employee restored successfully",
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

export const permanentDeleteEmployee = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const employee = await User.findById(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        if (!employee.isDeleted) {
            return res.status(400).json({
                success: false,
                message: "Employee must be soft deleted first"
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Employee permanently deleted"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};