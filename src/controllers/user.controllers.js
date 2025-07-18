import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js" 
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    const{fullName, email, password, username } = req.body
        //console.log("email: ", email);
        if(
            [fullName, email, username, password].some((field) => 
            field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]    
        })

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exist")
        }
        //console.log(req.files);

       const avatarLocalPath = req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar) {
            throw new ApiError(400, "Avatar file is required")
        }

       const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })

       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
       )

       if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user") 
       }

       return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
       )

})

export {
    registerUser,
}

 // steps - {
 // 1: get user details from frontend,
 // 2: validation - not empty,
 // 3: check if user already exist - username, email,
 // 4: check for images, avatar,
 // 5: upload them to cloudinary, avatar,
 // 7: create user object - create entry in db,
 // 8: remove password and refresh token field from response,
 // 9: check for user creation,
 // 10: return res
//}
 