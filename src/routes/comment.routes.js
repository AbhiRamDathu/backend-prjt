import express from "express";
import { createComment, deleteComment, getCommentsByVideo, getUserComments, updateComment } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createComment);

router.get("/:videoId", getCommentsByVideo);

router.delete("/:commentId",verifyJWT, deleteComment);

router.put("/:commentId",verifyJWT, updateComment);

router.get("/:commentId", verifyJWT, getUserComments);

export default router;