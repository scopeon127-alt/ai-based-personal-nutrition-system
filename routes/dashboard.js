const express = require("express");
const HealthData = require("../models/HealthData");
const router = express.Router();

// Middleware to protect routes
function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Recommendation logic
function generateRecommendation(data) {
  let recs = [];
  let bmi = (data.weight / (data.height / 100) ** 2).toFixed(1);

  // BMI based suggestions
  if (bmi < 18.5) recs.push("Increase protein and calorie intake.");
  else if (bmi >= 18.5 && bmi < 25)
    recs.push("Maintain a balanced diet with fruits & vegetables.");
  else
    recs.push(
      "Follow a low-carb diet, high fiber foods, and regular exercise."
    );

  // Goals based
  if (data.goals && data.goals.includes("Weight loss"))
    recs.push("Cut sugar and processed food.");
  if (data.goals && data.goals.includes("Weight gain"))
    recs.push("Add nuts, dairy, and resistance training.");
  if (data.goals && data.goals.includes("Build muscle"))
    recs.push("High protein diet + strength training.");

  // Diet type
  if (data.dietType === "Vegetarian")
    recs.push("Eat pulses, paneer, and lentils.");
  if (data.dietType === "Non-vegetarian")
    recs.push("Include eggs, chicken, and fish.");
  if (data.dietType === "Vegan")
    recs.push("Focus on tofu, soy, and plant-based proteins.");

  return { bmi, recs: recs.join(" ") };
}

// Dashboard
router.get("/", isAuth, async (req, res) => {
  const records = await HealthData.find({ userId: req.user._id });
  res.render("dashboard", { user: req.user, records });
});

// Health Form (GET)
router.get("/health-form", isAuth, (req, res) => {
  res.render("healthForm");
});

// Health Form (POST)
router.post("/health-form", isAuth, async (req, res) => {
  const rec = generateRecommendation(req.body);

  const healthData = new HealthData({
    ...req.body,
    userId: req.user._id,
    recommendations: rec.recs,
  });

  await healthData.save();
  res.redirect("/dashboard");
});

module.exports = router;
