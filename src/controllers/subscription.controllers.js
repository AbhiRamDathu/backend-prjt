import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// subscriber for channel
const subscribeChannel = asyncHandler(async(req, res) => {
    const { channelId } = req.body;
    const userId = req.user._id;

     if(channelId === userId.toString() ) {
        throw new ApiError(400, "You can't subscribe to your own channel")
    }

    const alreadySubscribed = await Subscription.findOne({
    channel: channelId,
    subscriber: subscriberId,
});

if(alreadySubscribed) {
    throw new ApiError(409, "Already subscribed to this channel");
}

const subscription = await Subscription.create({
    subscriber: subscriberId,
    channel: channelId,
});

return res
.status(200)
.json(new ApiResponse(200, Subscription, "Subscribed successfully"))

});

// Unsubscribe

 const unsubscribeChannel = asyncHandler(async(req, res) => {
    const { channelId } = req.body;
    const userId = req.user._id;

    const subscription  = await Subscription.findOneAndDelete({
        channel: channelId,
        subscriber: subscriberId,
    })

    if (!subscription) {
        throw new ApiError(404, "You are not subscribed to this channel");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Unsubscribed successfully"))
});

const getSubscribers = asyncHandler(async(req, res) => {
    const { channelId } = req.params;

    if(!!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new ApiError(400, "Invalid channel Id")
    }

    const subscribers = await Subscription.find({
        channel: channelId
    }).populate("subscriber", "fullName username avatar")
    .exec();

    return res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Subscribers fetched successfully"));
});

export {
    subscribeChannel,
    unsubscribeChannel,
    getSubscribers,
}