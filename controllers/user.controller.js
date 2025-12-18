import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= CREATE USER ======================
export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (username, email, password) are required",
                data: null
            });
        }

        // Check duplicate user
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please login.",
                data: null
            });
        }

        // Hashing password
        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_SIZE)
        );

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
};



// ================= LOGIN USER ======================
export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate fields
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
                data: null
            });
        }

        // Find user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first.",
                data: null
            });
        }

        // Compare hashed passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                data: null
            });
        }

        // Create JWT access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXP }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: accessToken,           // Renamed to token for standard clarity
            tokenType: "Bearer",          // Info for client
            expiresIn: process.env.JWT_EXP
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
};
