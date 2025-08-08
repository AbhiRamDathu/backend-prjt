import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Like } from "../models/like.models.js";
import { Comment } from "../models/comment.models.js";
import { Playlist } from "../models/playlist.models.js";
import { Tweet } from "../models/tweet.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Video } from "../models/video.models.js";

const getUserDashboard = asyncHandler(async(req, res) => {
    const userId = req.user._id;

    const[user, videos, subscribers, totalLikes, totalComments, playlists, totalTweets] = await Promise.all([
        User.findById(userId).select("fullName email password username avatar coverImage createdAt"),
        Video.find({owner: userId}),
        Subscription.find({ channel: userId}),
        Comment.countDocuments({ owner: userId}),
        Like.countDocuments({ likedBy: userId}),
        Tweet.countDocuments({ tweetedBy: userId}),
        Playlist.find({ owner: userId}),
    ]);

    const totalViews = videos.reduce((acc, video) => acc + (video.views || 0), 0);

    return res
    .status(200)
    .json({
        success: true,
        message: "Dashboard fetched successfully",
        data: {
            stats: {
                totalVideos: videos.length,
                totalSubscribers: subscribers.length,
                totalPlaylists: playlists.length,
                totalComments,
                totalLikes,
                totalViews,
                totalTweets,
            },
        },
    });
});

export {
    getUserDashboard,
}