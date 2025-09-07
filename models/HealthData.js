const mongoose = require("mongoose");

const HealthDataSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // 1. Personal Information
    name: String,
    age: Number,
    gender: String,

    // 2. Body Metrics
    height: Number, // in cm
    weight: Number, // in kg
    activityLevel: String, // Sedentary / Moderate / Active

    // 3. Health Information
    medicalConditions: String,
    allergies: String,
    medications: String,

    // 4. Dietary Preferences
    dietType: String, // Vegetarian / Non-veg / Vegan / Pescatarian
    likes: String,
    dislikes: String,

    // 5. Goals
    goals: String, // Weight loss / Gain / Maintain / Build muscle etc.

    // 6. Optional / Advanced
    sleepPattern: String,
    stressLevel: String,
    localFoodAvailability: String,

    // Recommendations result
    recommendations: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthData", HealthDataSchema);
