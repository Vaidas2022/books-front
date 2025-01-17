import React, { useState, useEffect } from 'react';
    import axios from '../../AxiosConfig';
    import { useParams, useNavigate } from 'react-router-dom';

    function BookForm({ isEdit = false }) {
        const { id } = useParams();
         const navigate = useNavigate();
        const [name, setName] = useState('');
        const [authorId, setAuthorId] = useState('');
        const [authors, setAuthors] = useState([]);

        useEffect(() => {
            fetchAuthors();
            if (isEdit && id) {
                fetchBook();
            }
        }, [id, isEdit]);


         const fetchAuthors = async () => {
            try {
                const response = await axios.get('/authors');
                setAuthors(response.data);
            } catch (error) {
                console.error('Klaida gaunant autorius:', error);
            }
        };

         const fetchBook = async () => {
            try {
                const response = await axios.get(`/books/${id}`);
                setName(response.data.name);
                 setAuthorId(response.data.author ? response.data.author.id : '');

            } catch (error) {
                console.error('Klaida gaunant knygą:', error);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
             const bookData = { name, author: authorId ? { id: parseInt(authorId, 10) } : null };
             try {
                if (isEdit) {
                    await axios.put(`/books/${id}`, bookData);
                } else {
                    await axios.post('/books', bookData);
                }
                 navigate('/books');
            } catch (error) {
                console.error('Klaida išsaugant knygą:', error);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <h2>{isEdit ? 'Redaguoti knygą' : 'Pridėti knygą'}</h2>
                <div>
                    <label>Pavadinimas:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Autorius:</label>
                     <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                       <option value="">Pasirinkite autorių</option>
                       {authors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                       ))}
                      </select>
                </div>

                <button type="submit"> {isEdit ? 'Redaguoti' : 'Pridėti'} </button>
            </form>
        );
    }

    export default BookForm;