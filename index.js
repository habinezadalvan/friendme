import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import routes from "./routes/index.js";

const app = express();
dotenv.config();

const sessionConfig = {
  secret: process.env.CSRF_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  sessionId: { regenerate: true },
};

if (app.get("env") === "production") {
  sessionConfig.cookie.secure = true;
}
// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(session(sessionConfig));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connecting mongo database
const port = process.env.PORT || 8000;
const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CONNECT);
    app.listen(port, () =>
      console.log(
        `Database is connected and Server is running on port: ${port}.`
      )
    );
  } catch (err) {
    console.log(`Database connection error: ${err}`);
  }
};

connectDb();

app.use("/api", routes);
