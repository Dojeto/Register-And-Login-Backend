import express,{Router} from 'express'
import client from '../models/database.js';
import auth from '../middleware/authorization.js'

const router = Router();

router.get('/',auth,async(req,resp)=>{
    try {
        const user = await client.query("SELECT user_name FROM users WHERE user_id=$1",[req.user])
        resp.json(user.rows[0]);
    } catch (error) {
        console.log(error.message)
        resp.status(500).send("Server Error");
    }
})

export default router;