import jwt from 'jsonwebtoken'
import { config } from 'dotenv';

config();
const auth = async(req,resp,next)=>{
        
        const jwtToken = req.header("token");

        if(!jwtToken)
        {
            return resp.status(403).send("Not Authorize");
        }

        try {
            //it is going to give us the user id (user:{id: user.id})
            const verify = jwt.verify(jwtToken, process.env.jwtSecret);
            req.user = verify.user;
            next();
          } catch (err) {
            resp.status(401).json({ msg: "Token is not valid" });
          }
}



export default auth;