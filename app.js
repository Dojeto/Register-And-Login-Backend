import express from 'express'
import cors from 'cors'
import client from './models/database.js';
import auth from './routes/jwtAUth.js';

const app = express();

app.use(express.json()) // req body
app.use(cors())

//ROUTES

app.use('/auth',auth)

app.listen(3000,()=>{
    console.log("Working on 3000");
})