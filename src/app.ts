import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import { Server as socketIOServer } from 'socket.io';
dotenv.config();
import connectToMongo from './database/db';
import userRouter from './routes/users/userRouter'
import router from './routes/Assets/chatRoutes';
const app = express();
connectToMongo();
const server = http.createServer(app);

// Initialize socket.io server
const io = new socketIOServer(server);

// app.locals.io = io;
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.get('/', (req: Request, res: Response) => {
    res.send("Hi, I am TypeScript! Any problem . Noo!!");
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    'allowedHeaders': ['Authorization', 'Content-Type']
}))

app.use('/user', userRouter)
app.use('/chat',router)
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

