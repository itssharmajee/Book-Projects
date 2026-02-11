import express from 'express';
import dotenv from "dotenv"
// dotenv.config({path:"./controllers/.env"});
dotenv.config();
import bookRouter from "./routes/book.route.js"
import userRouter from "./routes/user.route.js"
import imageRouter from "./routes/image.route.js"

import { DBConfig } from './database/db.js';
const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection 
await DBConfig()

// normal routes
app.get('/', (req, res) => {
    res.send(`Working perfectly`);
})

// Get book routes
app.use('/api/v1/book', bookRouter);
app.use('/api/v1/user', userRouter);
app.use('/image',imageRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})