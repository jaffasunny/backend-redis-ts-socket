import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { TCorsOptions } from "./types/index.ts";

const corsOptions: TCorsOptions = {
  origin: process.env.CORS_ORIGIN as string,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from "./routes/user.route.ts";
import postRouter from "./routes/post.route.ts";
import notificationRouter from "./routes/notification.route.ts";

// routes declaration
app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "<h1>Welcome to intial route for Backend Social Media Platform...</h1>"
    );
});

// auth routes
app.use("/api/v1/users", userRouter);

// posts routes
app.use("/api/v1/posts", postRouter);

// notifications routes
app.use("/api/v1/notifications", notificationRouter);

export { app };
