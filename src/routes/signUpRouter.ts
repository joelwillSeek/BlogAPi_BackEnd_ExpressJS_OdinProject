import {Router} from "express"
import { signUp_createAccount } from "../controller/signUpController";
const router=Router();

router.post("/",signUp_createAccount);

export default router;