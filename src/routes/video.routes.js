import express from "express";
import { uploadVideo, updateVideo, deleteVideo,  getVideo, getAllVideos, getUserVideos} from "../controllers/video.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post("/", verifyJWT, upload.single("videoFile"), uploadVideo);

router.get("/:videoId", getVideo);

router.get("/", getAllVideos);

router.get("/user/:userId", verifyJWT, getUserVideos);

router.patch("/:videoId", verifyJWT, updateVideo);

router.delete("/:videoId", verifyJWT, deleteVideo);

export default router;