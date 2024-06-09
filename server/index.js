import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adoptionRoutes from "./routes/adoptionRoutes.js";

const app = express();
app.use(cors());

// Apply Middleware for post and patch request in adoption
app.use(express.json());

// We use this body parser to limit the size of the image we will going to send
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

// Adoption routes
app.use("/adoption", adoptionRoutes);

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.MONGO_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("Database connection error:", error.message));
