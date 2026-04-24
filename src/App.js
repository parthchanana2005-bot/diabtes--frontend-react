import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree_function: "",
    age: "",
    hba1c: "",
    heart_rate: "",
    triglycerides: "",
    cholesterol: "",
    waist_to_hip_ratio: "",
    physical_activity: "",
    diet_score: "",
    alcohol: "",
    smoking: "",
    sleep_hours: "",
    stress_level: "",
    water_intake: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predict = () => {
    const f = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, parseFloat(v) || 0])
    );

    // 🔥 Weighted risk calculation (simple but meaningful)
    let riskScore =
      (f.glucose / 200) * 0.25 +
      (f.bmi / 50) * 0.15 +
      (f.age / 100) * 0.1 +
      (f.hba1c / 10) * 0.2 +
      (f.triglycerides / 300) * 0.05 +
      (f.cholesterol / 300) * 0.05 +
      (f.waist_to_hip_ratio / 2) * 0.05 +
      (f.blood_pressure / 150) * 0.05 +
      (f.stress_level / 10) * 0.03 +
      (f.sleep_hours < 6 ? 0.05 : 0) +
      (f.smoking ? 0.03 : 0) +
      (f.alcohol / 20) * 0.02;

    riskScore = Math.min(1, riskScore);

    const prediction = riskScore > 0.5 ? "Diabetic" : "Not Diabetic";
    const confidence = (riskScore * 100).toFixed(2);

    setResult({
      prediction,
      riskScore: riskScore.toFixed(2),
      confidence,
    });
  };

  return (
    <div className="container">
      <h1>🧠 Diabetes Predictor</h1>

      {Object.keys(formData).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key.replaceAll("_", " ")}
          onChange={handleChange}
        />
      ))}

      <button onClick={predict}>🚀 Predict</button>

      {result && (
        <div className="result">
          <h2>Result</h2>
          <p><b>Prediction:</b> {result.prediction}</p>
          <p><b>Risk Score:</b> {result.riskScore}</p>
          <p><b>Confidence:</b> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default App;