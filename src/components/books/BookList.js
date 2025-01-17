import React, { useState, useEffect } from 'react';
import axios from '../../AxiosConfig';
import { Link } from 'react-router-dom';
import './BookList.css'

    function BookList() {
        const [books, setBooks] = useState([]);

        useEffect(() => {
            fetchBooks();
        }, []);

         const fetchBooks = async () => {
            try {
                const response = await axios.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Klaida gaunant knygas:', error);
            }
        };

         const handleDelete = async (id) => {
            try {
                await axios.delete(`/books/${id}`);
               fetchBooks(); // Atnaujiname knygų sąrašą
            } catch (error) {
                console.error('Klaida trinant knygą:', error);
            }
        };

        return (
            <div>
            <h2>Knygų sąrašas</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pavadinimas</th>
                  <th>Autorius</th>
                  <th>Veiksmai</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.book_id}>
                    <td>{book.book_id}</td>
                    <td>{book.book_name}</td>
                    <td>{book.author_name || "Nėra autoriaus"}</td>
                    <td>
                      <Link to={`/books/edit/${book.book_id}`}>Redaguoti</Link>
                      <button onClick={() => handleDelete(book.book_id)}>Trinti</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/books/add" className="add-button">Pridėti knygą</Link>
          </div>
            );
    }

    export default BookList;