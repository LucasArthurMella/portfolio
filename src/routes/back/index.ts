import { Router } from "express";
import admRoutes from "./adm";
import emailRoutes from "./email";

const router = Router();
router.use("/", admRoutes);
router.use("/", emailRoutes);

export default router;
