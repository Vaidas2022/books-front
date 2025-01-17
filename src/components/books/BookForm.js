import React, { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import "./BookForm.css";

function BookForm({ isEdit, onSubmit }) {
  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Klaida gaunant autorius:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = { name, authorId: authorId || null };

    try {
      await onSubmit(bookData); // Funkcija, kuri tvarko pridėjimą/redagavimą
      setName("");
      setAuthorId("");
    } catch (error) {
      console.error("Klaida pateikiant formą:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{isEdit ? "Redaguoti knygą" : "Pridėti knygą"}</h2>
      <div className="form-group">
        <label htmlFor="book-name">Pavadinimas:</label>
        <input
          id="book-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="author-select">Autorius:</label>
        <select
          id="author-select"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Pasirinkite autorių</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="submit-button">
        {isEdit ? "Redaguoti" : "Pridėti"}
      </button>
    </form>
  );
}

export default BookForm;
