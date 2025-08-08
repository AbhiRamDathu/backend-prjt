import express from "express";
import { subscribeChannel, unsubscribeChannel, getSubscribers } from "../controllers/subscription.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/subscriber/:channelId", verifyJWT, subscribeChannel);
router.post("/unsubscriber/:channelId", verifyJWT, unsubscribeChannel);
router.get("/:channelId", verifyJWT, getSubscribers);

export default router;