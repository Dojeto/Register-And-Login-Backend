import express from 'express'
import cors from 'cors'
import client from './models/database.js';
import auth from './routes/jwtAUth.js';
import dashboard from './routes/dashboard.js'

const app = express();

app.use(express.json()) // req body
app.use(cors())

//ROUTES

app.use('/auth',auth)
app.use('/dashboard',dashboard)

app.listen(3000,()=>{
    console.log("Working on 3000");
})