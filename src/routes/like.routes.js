import express from "express";
import { checkIfLiked, getLike, toggleLike } from "../controllers/like.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/toggle", verifyJWT, toggleLike);

router.get("/", verifyJWT, getLike);

router.get("/check", verifyJWT, checkIfLiked);

export default router;