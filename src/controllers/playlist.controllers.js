import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.models.js";

const createPlaylist = asyncHandler(async(req, res) => {
    const { name, description,  videos = [] } = req.body;
    const ownerId = req.user._id;

    if(!name || !description) {
        throw new ApiError(400, "Name and description are required")
    }

    if(videos.length > 0) {
        const validVideo = await videos.find({ _id: { $in: videos }});
    }

    if( validVideos !== videos.length) {
        throw new ApiError(400, "One or more videos doesnot exist");
    }

    const newPlaylist = await Playlist.create({
        name,
        description,
        videos,
        owner: ownerId
    });

    return res
    .status(200)
    .json(new ApiResponse(200, Playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async(req, res) => {
    const ownerId = req.body;

    const playlists = await Playlist.find({ owner: ownerId}).populate("videos", "title url thumbnail").sort({ created: -1});

    return res 
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlists fetched successfully"));
});

const toggleVideoInPlaylist = asyncHandler(async(req, res) => {
    const { playlistId } = req.params;
    const { videoId } = req.body;
    const userId = req.user._id;

    const playlist = await Playlist.findById(playlistId);

    if(!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if(playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to modify this playlist")
    }

    const videoIndex = playlist.videos.findIndex(
        (vid) => vid.toString() === videoId
    );

    let message = "";

    if(videoIndex === -1) {
        playlist.videos.push(videoId)
        message = "Video added to playlist"
    } else {
        playlist.videos.splice(videoIndex, 1)
        message = "Video is removed from playlist"
    }

    await playlist.save();

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, message));

});

const deletePlaylist = asyncHandler(async(req, res) => {
    const { playlistId } = req.params;
    const userId = req.user._id;

    const playlist = await Playlist.findById(playlistId);

    if(!playlist) {
        throw new ApiError(404, "Playlist not found")
    };

    if(playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this playlist")
    };

    await playlist.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Playlist deleted successfully"))
});

const updatePlaylist = asyncHandler(async(req, res) => {
    const { playlistId } = req.params;
    const userId = req.user._id;
    const { name, description } = req.body;

    const playlist = await Playlist.findById(playlistId);

    if(!playlist) {
        throw new ApiError(404, "Playlist not found")
    };

    if(playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this playlist")
    };

    if(name) playlist.name = name;
    if(description) playlist.description = description;

    await playlist.save();

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist update successfully"))
});

export {
    createPlaylist,
    getUserPlaylists,
    toggleVideoInPlaylist,
    deletePlaylist,
    updatePlaylist,
}