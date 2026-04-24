import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    glucose: "",
    bmi: "",
    age: "",
    insulin: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predict = () => {
    const glucose = parseFloat(formData.glucose);
    const bmi = parseFloat(formData.bmi);
    const age = parseFloat(formData.age);
    const insulin = parseFloat(formData.insulin);

    // SIMPLE LOGIC (you can tweak later)
    let riskScore =
      (glucose / 200) * 0.4 +
      (bmi / 50) * 0.3 +
      (age / 100) * 0.2 +
      (insulin / 300) * 0.1;

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

      <input
        name="glucose"
        placeholder="Glucose"
        onChange={handleChange}
      />
      <input name="bmi" placeholder="BMI" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input
        name="insulin"
        placeholder="Insulin Level"
        onChange={handleChange}
      />

      <button onClick={predict}>🚀 Predict</button>

      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>Prediction: {result.prediction}</p>
          <p>Risk Score: {result.riskScore}</p>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default App;