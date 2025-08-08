import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middlewares/error.middlewares.js";
//import { errorMiddleware } from "./middlewares/error.middlewares.js";
import dotenv from "dotenv";


dotenv.config();

// routes
import userRouter from './routes/user.routes.js';
import videoRouter from "./routes/video.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import commentRouter from "./routes/comment.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import likesRouter from "./routes/like.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import healthcheckRoutes from "./routes/healthcheck.routes.js";

const app = express()

app.use(cors( {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request on ${req.url}`);
  next();
});

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likesRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/healthcheck", healthcheckRoutes);


//app.use(fileUpload({
  //  useTempFiles: true,
  //  tempFileDir: "/tmp/",
//}));
import { errorMiddleware } from "./middlewares/error.middlewares.js";
app.use(errorMiddleware);
app.use(notFound);

// http://localhost:8000/api/v1/users/register
export default app;