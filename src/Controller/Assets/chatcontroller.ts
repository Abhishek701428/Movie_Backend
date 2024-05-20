// chatController.ts

import { Request, Response } from 'express';
import Message from '../../models/Assets/messagemodal';

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

export const postMessage = async (req: Request, res: Response) => {
    const { username, text } = req.body;
    try {
        const message = new Message({ username, text });
        await message.save();
        // Emit the message to all connected clients
        req.app.locals.io.emit('message', message);
        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ message: 'Failed to send message' });
    }
};
