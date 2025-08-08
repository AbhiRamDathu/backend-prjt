import express from "express";
import { healthcheckController } from"../controllers/healthcheck.controllers.js";
//import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", healthcheckController);

export default router;