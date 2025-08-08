import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.models.js";

const createTweet = asyncHandler(async(req, res) => {
    const { content } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet should not be empty")
    };

    const tweet = await Tweet.create({
        content,
        owner: req.user._id,
    });

    return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweer created successfully"))
});

const getAllTweets = asyncHandler(async(res, req) => {
    const tweets = await Tweet.find()
    .populate("owner", "username avatar")
    .sort({ createdAt: -1});

    return res
    .status(200)
    .json(new ApiResponse(200, tweets, "All tweets fetched successfully"));
});

const getTweetById = asyncHandler(async(req, res) => {
    const { tweetId } = req.params;

    const tweet = await Tweet.findById(tweetId)
    .populate("owner", "username avatar")

    if(!tweet) {
        throw new ApiError(404, "Tweet not found")
    };

    return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet fetched successfully"));
});

const getUserTweets = asyncHandler(async(req, res) => {
    const tweets = await Tweet.find({ owner: req.user._id}).sort({ createdAt: -1})

    return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Your tweets fetched successfully"));
});

const deleteTweet = asyncHandler(async(req, res) => {
    const { tweetId } =req.params;

    const tweet = await Tweet.findById(tweetId);

    if(!tweet) {
        throw new ApiError(403, "Tweet not found")
    };

    if(tweet.owner.toString !== req.user._id.toString()) {
        throw new ApiError(404, "You are not authorized to delete this tweet")
    };

    await tweet.deleteOne();

    return res

    .status(200)
    .json(new ApiResponse(200, null, "Tweet deleted successfully"));
});

export {
    createTweet,
    getAllTweets,
    getTweetById,
    getUserTweets,
    deleteTweet,
}