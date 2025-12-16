import express from 'express';
import dotenv from "dotenv"
// dotenv.config({path:"./controllers/.env"});
dotenv.config();

import { DBConfig } from './database/db.js';
const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// DB connection 
await DBConfig()

// normal routes
app.get('/',(req,res)=>{
    res.send(`Working perfectly`)
})

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})