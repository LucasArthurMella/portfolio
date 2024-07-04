import { Router } from "express";
import helloWorld from "./helloworld";


const router = Router();
router.use("/helloworld", helloWorld);

export default router;
