import { Router } from "express";
import client from './models/database.js';
const router =Router();

router.post('/',async(req,resp)=>{
    try {
        //1.Destructure the req.body(name ,email,password)

        //2.check if user exist

        //3.Bcrypt the user password
        
        //4. Inster user information in our database
        
        //5.generating our jwt token
    } catch (error) {
        console.log(error.message);
        resp.status(500).send("server Error") ;
    }
})
export default router;
