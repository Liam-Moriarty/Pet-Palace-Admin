import mongoose from "mongoose";

const adoptionSchema = mongoose.Schema(
  {
    imageFile: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdoptionDetails = mongoose.model("AdoptionDetails", adoptionSchema);

export default AdoptionDetails;
