
import { Router } from "express";

const router = Router();

router.get("/", function(req, res) {
  res.send("Hello world from frontend!");
});

export default router;
