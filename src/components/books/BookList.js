import React, { useState, useEffect } from 'react';
import axios from '../../AxiosConfig';
import { Link } from 'react-router-dom';

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
                    <ul>
                        {books.map((book) => (
                            <li key={book.book_id}>
                                {book.book_name} (Autorius: {book.author_name || 'Nėra autoriaus'}) {/* Naudojame book_name ir author_name */}
                                <Link to={`/books/edit/${book.book_id}`}> Redaguoti</Link> {/* Naudojame book_id */}
                                <button onClick={() => handleDelete(book.book_id)}>Trinti</button>  {/* Naudojame book_id */}
                            </li>
                        ))}
                    </ul>
                    <Link to="/books/add">Pridėti knygą</Link>
                </div>
            );
    }

    export default BookList;