import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  { User,UserDocument } from '../../models/users/UserModel';
import * as dotenv from "dotenv";
dotenv.config();
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'secret');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to register user' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        let user: UserDocument | null;
        if (email) {
            user = await User.findOne({ email });
        } else if (username) {
            user = await User.findOne({ username });
        } else {
            return res.status(400).json({ message: 'Username or email is required' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or email or password' });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'secret');
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};
