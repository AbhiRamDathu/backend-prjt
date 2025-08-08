import Video from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadVideo = asyncHandler(async(req, res) => {
    const { title, description, videoFile, thumbnail, tags } = req.body;

    if(!title || !description) {
        throw new ApiError(400, "Title and description are required")
    };

    const video = await Video.create({
        title,
        description, 
        videoFile,
        thumbnail,
        tags,
        owner: req.user._id,
    });

    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded succcessfully"));
});

const updateVideo = asyncHandler(async(req, res) => {
    const { videoId } = req.params;
    const updates = req.body;

    const video = await Video.findById(videoId);

    if(!video) {
        throw new ApiError(404, "Video is not found")
    }

    if(!video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this video")
    };

    Object.assign(video, updates);
    await video.save();

    return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async(req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if(!video) {
        throw new ApiError(404, "Video is mot found")
    };

    if(video.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this video")
    };

    await video.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, "Video deleted successfully"))
});

const getVideo = asyncHandler(async(req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate("owner", "username avatar")

    if(!video) {
        throw new ApiError(404, "Video is not found")
    };

    return res
    .status(200)
    .json(new ApiResponse(200, video))
});

const getAllVideos = asyncHandler(async(req, res) => {
    const videos = await Video.find({ isPublished: true })
    .populate("owner", "username avatar")
    .sort({ createdAt: -1});

    return res
    .status(200)
    .json(new ApiResponse(200, videos, videos.length));
});

const getUserVideos = asyncHandler(async(req, res) => {
    const { userId } = req.params;

    if(!userId) {
        throw new ApiError(400, "UserId is required")
    };

    const isOwner = req.user && req.user._id.toString === userId;

    const videos = await Video.find({
        owner: userId,
        ...( isOwner? {} : {isPublished: true}),
        }).sort({ createdAt: -1});

        return res
        .status(200)
        .json(new ApiResponse(200, videos, videos.length));
});

export {
    uploadVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    getAllVideos,
    getUserVideos,
}