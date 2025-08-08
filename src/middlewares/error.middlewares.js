const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res
    .status(statusCode)
    .json({
        success: false,
        message: err.message || "Internet server error",
        error: err.errors || [],
    });
};

const notFound = (req, res, next) => {
    return res
    .status(404)
    .json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
};

export {
    errorMiddleware,
    notFound,
}