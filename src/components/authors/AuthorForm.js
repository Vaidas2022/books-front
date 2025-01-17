import React, { useState } from "react";
import "./AuthorForm.css";

function AuthorForm({ isEdit, onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorData = { name };

    try {
      await onSubmit(authorData); // Funkcija, tvarkanti pridėjimą/redagavimą
      setName(""); // Išvalome lauką
    } catch (error) {
      console.error("Klaida pateikiant formą:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="author-form">
      <h2>{isEdit ? "Redaguoti autorių" : "Pridėti autorių"}</h2>
      <div className="form-group">
        <label htmlFor="author-name">Vardas:</label>
        <input
          id="author-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        {isEdit ? "Redaguoti" : "Pridėti"}
      </button>
    </form>
  );
}

export default AuthorForm;
