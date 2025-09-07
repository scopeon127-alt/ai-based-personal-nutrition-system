const Health = require("../models/Health");
const generateRecommendation = require("../utils/recommendationGenerator");

exports.submitHealthForm = async (req, res) => {
  try {
    const data = req.body;
    const recommendations = generateRecommendation(data);

    const newRecord = new Health({
      userId: req.user._id,
      ...data,
      recommendations,
    });

    await newRecord.save();
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Error saving health data");
  }
};
