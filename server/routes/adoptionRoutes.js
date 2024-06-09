import express from "express";
import {
  getAdoptions,
  sendAdoptions,
} from "../controllers/adoptionController.js";

const router = express.Router();

// To get documents from the server
router.get("/", getAdoptions);

// For sending documents to the server
router.post("/", sendAdoptions);

export default router;
