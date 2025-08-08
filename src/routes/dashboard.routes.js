import express from "express"
import { getUserDashboard } from "../controllers/dashboard.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/", verifyJWT, getUserDashboard);

export default router; 