import { Router } from "express";
import bcrypt from "bcrypt";
import client from '../models/database.js';
import jwtClient from "../utils/jwtGenrator.js";
import validInfo from "../middleware/validInfo.js";
import auth from "../middleware/authorization.js";
const router =Router();

router.get("/",async(req,resp)=>{
    resp.send("Welcome to home page");
})

router.post('/register',validInfo,async(req,resp)=>{
    try {
        //1.Destructure the req.body(username ,email,password)
        const { username, email , password} = req.body;
        //2.check if user exist
        const user = await client.query("SELECT * FROM users WHERE user_email= $1",[email]);
        if(user.rowCount !== 0)
        {
            return resp.status(401).send("User already exist");
        }
        //3.Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password,salt);
        
        //4.insert new user in database 
        const newUser = await client.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",[username,email,bcryptPassword]);

        // resp.json(newUser);

        //5.generating our jwt token

        const token = jwtClient(newUser.rows[0].user_id);

        resp.json( { token } );
       
    } catch (error) {
        console.log(error.message);
        resp.status(500).send("server Error") ;
    }
})


// login route

router.post('/login',validInfo,async(req,resp)=>{
    try {
        //1.destructure req.body
        const {email , password} = req.body;
        
        //2 check user is exist

        const user = await client.query("SELECT * FROM users WHERE user_email=$1",[email]);

        if(user.rowCount === 0)
        {
            return resp.status(401).send("User Dosen't Exist");
        }
        
        //3 check incoming password is same or not

        // resp.json(user.rows[0].user_password);

        const validPass = await bcrypt.compare(password,user.rows[0].user_password);

        console.log(validPass);

        if(!validPass)
        {
            return resp.status(401).json("Password is incorrect")
        }

        //4 give jwt token

        const token = jwtClient(user.rows[0].user_id);

        resp.json( { token } );
    } catch (error) {
        console.log(error.message);
        resp.status(500).send("server Error") ;
    }
})

router.get('/is-verify',auth ,async(req,resp)=>{
    try {
        resp.status(200).json(true);
    } catch (error) {
        console.log(error.message);
        resp.status(500).send("server Error") ;
    }
})
export default router;
