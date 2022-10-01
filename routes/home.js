import { Router } from "express";

const router = Router();

router.get("/",async(req,resp)=>{
    resp.send("Welcome to Register and Log-in System Backend");
})

export default router;