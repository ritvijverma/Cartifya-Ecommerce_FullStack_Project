import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categogryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
// config env
dotenv.config();

// db connect
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/api/v1/auth", authRoutes);

//Category routes
app.use("/api/v1/category",categogryRoute)

//Product Route
app.use("/api/v1/product",productRoute)

// React build serve
app.use(express.static(path.join(__dirname, "client/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
