import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, getAllTweets, getUserTweets, getTweetById, deleteTweet } from "../controllers/tweet.controllers.js";

const router = express.Router();

router.post("/", verifyJWT, createTweet);

router.get("/", getAllTweets);

router.get("/tweetId", getTweetById);

router.get("/user/me", verifyJWT, getUserTweets);

router.delete("/tweetId", verifyJWT, deleteTweet);

export default router;