import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createPlaylist, deletePlaylist, getUserPlaylists, toggleVideoInPlaylist, updatePlaylist } from "../controllers/playlist.controllers.js";
import { get } from "mongoose";

const router = express.Router()

router.post("/", verifyJWT, createPlaylist)
router.get("/mine", verifyJWT, getUserPlaylists)

router.put("/:playlistId/toggle-video", verifyJWT, toggleVideoInPlaylist);
router.delete("/:playlistId", verifyJWT, deletePlaylist);
router.put("/:playlistId", verifyJWT, updatePlaylist);

export default router;