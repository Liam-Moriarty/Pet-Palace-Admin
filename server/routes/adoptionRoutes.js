import express from "express";
import {
  getAdoptions,
  sendAdoptions,
  upload,
} from "../controllers/adoptionController.js";

const router = express.Router();

// To get documents from the server
router.get("/", getAdoptions);

// For sending documents to the server
router.post("/", upload.single("imageFile"), sendAdoptions);

export default router;
