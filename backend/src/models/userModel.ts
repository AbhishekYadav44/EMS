import mongoose, { Document, Schema, Model } from "mongoose";



export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    HR_MANAGER = "HR_MANAGER",
    EMPLOYEE = "EMPLOYEE",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export interface IUser extends Document {

    name: string;
    email: string;
    password: string;
    phone: string;
    department: string;
    designation: string;
    salary: number;
    joiningDate: Date;
    status: UserStatus;
    role: UserRole;
    reportingManager?: mongoose.Types.ObjectId | null;
    profileImage?: string;
    isDeleted: boolean;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,

        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            required: true,
            trim: true,
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: Number,
            required: true,
            min: 0,
        },

        joiningDate: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: Object.values(UserStatus),
            default: UserStatus.ACTIVE,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.EMPLOYEE,
        },

        reportingManager: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },


        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema)
export default User;