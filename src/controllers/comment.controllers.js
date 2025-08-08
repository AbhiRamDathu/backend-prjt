import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.models.js";

const createComment = asyncHandler(async(req, res) => {
    const { content, videoId } = req.body;

    if(!content || !videoId) {
        throw new ApiError(400, "Content and videoId are required")
    };

    const video = await Video.findById(videoId);

    if(!video) {
        throw new ApiError(404, "Video is not found")
    };

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id,
    });

    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment added successfully"));
});

const deleteComment = asyncHandler(async(req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ApiError(404, "Comment is not found")
    };

    if(comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment")
    };

    await comment.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});

const getCommentsByVideo = asyncHandler(async(req, res) => {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId })
    .populate("owner", "username fullName avatar")
    .sort({ createdAt: -1});

    if(!comments || !comments.length === 0) {
        throw new ApiError(404, "No comments are found")
    };

    return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const getUserComments = asyncHandler(async(req, res) => {
    const userId = req.user?._id;

    const comments = await Comment.find({ owner: userId})
    .populate("video", "title thumbnail")
    .sort({createdAt: -1})

    if(!comments || comments.length === 0) {
        throw new ApiError(404, "No comments found for this user")
    };

    return res
    .status(200)
    .json(new ApiResponse(200, "User's comment's fetched successfully"));
});

const updateComment = asyncHandler(async(req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if(!content?.trim()) {
        throw new ApiError(400, "Updated content cannot be empty")
    };

    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ApiError(404, "Comment not found")
    };

    if(comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment")
    };

    comment.content = content;
    await comment.save();

    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

export {
    createComment,
    deleteComment,
    getCommentsByVideo,
    getUserComments,
    updateComment,
}