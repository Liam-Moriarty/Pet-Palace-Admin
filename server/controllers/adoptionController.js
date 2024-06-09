import AdoptionDetails from "../models/adoptionModel.js";

// function to get all adoption documents from the server
export const getAdoptions = async (req, res) => {
  const adoption = await AdoptionDetails.find({}).sort({ createdAt: -1 });

  res.status(200).json(adoption);
};

// function to send adoption documents to the server
export const sendAdoptions = async (req, res) => {
  const { imageFile, name, age, breed, color, gender, type, description } =
    req.body;

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

export default {
  getAdoptions,
  sendAdoptions,
};
