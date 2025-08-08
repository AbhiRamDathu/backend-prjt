import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleLike = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const { videoId, commentId, tweetId } = req.body;

    if(!videoId && !commentId && !tweetId) {
        throw new ApiError(400, "Please provide videoId, commentId, or tweetId to like")
    }

    const filter = {
        likedBy: userId,
        ...(videoId && {video: videoId}),
        ...(commentId && {comment: commentId}),
        ...(tweetId && {tweet: tweetId}),
    }

    const existingLike = await Like.findOne(filter)

    if(existingLike) {
        await existingLike.deleteOne();

        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Successfully unliked"))
    };

    const newLike = await Like.create(filter);

    return res
    .status(201)
    .json(new ApiResponse(201, newLike, "Successfully liked"))
});

const getLike = asyncHandler(async(req, res) => {
    const { videoId, commentId, tweetId } = req.query;

    if(!videoId && !commentId && !tweetId) {
        throw new ApiError(400, "Please provide videoId, commentId, or tweetId")
    };

    const filter = {
        ...(videoId && {video: videoId}),
        ...(commentId && {comment: commentId}),
        ...(tweetId && {tweet: tweetId}),
    };

    const likeCount = await Like.countDocuments(filter);

    return res
    .status(200)
    .json(new ApiResponse(200, {count: likeCount}, "Like count fetched"));
});

const checkIfLiked = asyncHandler(async(req, res) => {
    const { videoId, commentId, tweetId } = req.query;
    const userId = req.user._id;

    const filter = {
        likedBy: userId
    };

    if (videoId) {
        filter.video = videoId;
    }else if(commentId) {
        filter.comment = commentId;
    }else if(tweetId) {
        filter.tweet = tweetId;
    }else{ 
        return res
        .status(400)
        .json({
        success: false,
        message: "No valid target Id(videoId, commentId, tweetId) provided"
        });
    }

    const alreadyLiked = await Like.findOne(filter);

    return res
    .status(200)
    .json(new ApiResponse(200, {liked: alreadyLiked}, "Like status fetched"))
});

export {
    toggleLike,
    getLike,
    checkIfLiked,
}
