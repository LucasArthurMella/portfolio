import { Router } from "express";
import admRoutes from "./adm";

const router = Router();
router.use("/", admRoutes);

export default router;
