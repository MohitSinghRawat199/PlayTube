import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./route/authRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ✅ REQUIRED FOR multipart/form-data text fields
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
