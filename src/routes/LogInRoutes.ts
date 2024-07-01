import { Router } from "express";
import { logIn_getUserIfExists } from "../controller/logInController";
const router=Router();

router.post("/",logIn_getUserIfExists)

export default router; 