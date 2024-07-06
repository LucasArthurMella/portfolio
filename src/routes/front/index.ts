import { Router } from "express";
import  helloworldRoute  from "./helloworld"
const router = Router();

router.use("/helloworld", helloworldRoute);
router.use("/", (req, res) => {
  res.render("home")
})
export default router;
