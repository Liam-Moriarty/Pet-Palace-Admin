import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";
import AdoptionDetails from "../models/adoptionModel.js";

// Resolve __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// function to get all adoption documents from the server
export const getAdoptions = async (req, res) => {
  try {
    const adoption = await AdoptionDetails.find({}).sort({ createdAt: -1 });
    res.status(200).json(adoption);
  } catch (error) {
    console.error("Error fetching adoption details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// function to send adoption documents to the server
export const sendAdoptions = async (req, res) => {
  const { name, age, breed, color, gender, type, description } = req.body;
  const imageFile = req.file ? req.file.path : null;
  // Add doc to db
  try {
    const adoption = await AdoptionDetails.create({
      imageFile,
      name,
      age,
      breed,
      color,
      gender,
      type,
      description,
    });

    res.status(200).json(adoption);
  } catch (error) {
    console.error("Error creating adoption details:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

export { upload }; // Export multer instance for reuse
