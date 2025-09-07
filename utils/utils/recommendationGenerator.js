function calculateBMI(weight, height) {
  let h = height / 100; // convert cm → meters
  return (weight / (h * h)).toFixed(1);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal weight";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
}

function generateRecommendation(data) {
  const bmi = calculateBMI(data.weight, data.height);
  const category = getBMICategory(bmi);

  let rec = `Your BMI is ${bmi} (${category}). `;

  if (data.goals === "Weight Loss") {
    rec +=
      "Focus on a calorie deficit with more protein and fiber. Avoid sugary foods.";
  } else if (data.goals === "Weight Gain") {
    rec +=
      "Increase calorie intake with protein-rich meals, nuts, and healthy fats.";
  } else if (data.goals === "Build Muscle") {
    rec +=
      "Prioritize strength training and high protein intake. Include eggs, lean meats, and pulses.";
  } else {
    rec += "Maintain a balanced diet with proper portion control.";
  }

  if (data.dietType === "Vegetarian") {
    rec += " Include pulses, legumes, paneer, tofu, and leafy greens.";
  } else if (data.dietType === "Vegan") {
    rec +=
      " Focus on soy products, lentils, quinoa, seeds, and B12 supplements.";
  } else if (data.dietType === "Pescatarian") {
    rec += " Add fish for omega-3s, along with vegetables and whole grains.";
  } else {
    rec += " Eat lean meats, eggs, whole grains, and vegetables.";
  }

  if (data.allergies) {
    rec += ` Avoid foods that may trigger your allergy (${data.allergies}).`;
  }

  if (data.stress === "High") {
    rec +=
      " Try stress management techniques like yoga, meditation, or walking daily.";
  }

  if (data.sleep && data.sleep < 6) {
    rec += " Improve your sleep (at least 7-8 hours) for better metabolism.";
  }

  return rec;
}

module.exports = generateRecommendation;
