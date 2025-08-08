//import { asyncHandler } from "../utils/asyncHandler.js";


const healthcheckController = (req, res) => {
    return res
    .status(200)
    .json({
        success: true,
        message: "Server is healthy and running",
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())}, seconds`,
    });
};

export {
    healthcheckController,
}