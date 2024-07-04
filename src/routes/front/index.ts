import { Router } from "express";
import  helloworldRoute  from "./helloworld"
const router = Router();


router.use("/helloworld", helloworldRoute);

export default router;
