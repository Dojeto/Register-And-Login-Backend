import express from 'express'
import cors from 'cors'
import client from './models/database.js';
// import routers from './routes/jwtauth.js'
import dashboard from './routes/dashboard.js'
import { config } from 'dotenv';

config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json()) // req body
app.use(cors())

//ROUTES

// app.use('/auth',routers)
app.use('/dashboard',dashboard)

app.listen(port,()=>{
    console.log(`Working on ${port}`);
})