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
                        <li key={book.id}>
                            {book.name} (Autorius: {book.author ? book.author.name : 'Nėra autoriaus'})
                            <Link to={`/books/edit/${book.id}`}> Redaguoti</Link>
                            <button onClick={() => handleDelete(book.id)}>Trinti</button>
                        </li>
                    ))}
                </ul>
                <Link to="/books/add">Pridėti knygą</Link>
            </div>
        );
    }

    export default BookList;