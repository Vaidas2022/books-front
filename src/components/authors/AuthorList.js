import React, { useState, useEffect } from 'react';
import axios from '../../AxiosConfig';
import { Link } from 'react-router-dom';
import './AuthorList.css';

    function AuthorList() {
        const [authors, setAuthors] = useState([]);

       useEffect(() => {
          fetchAuthors();
       }, []);

       const fetchAuthors = async () => {
          try {
            const response = await axios.get('/authors');
              setAuthors(response.data);
         } catch (error) {
          console.error('Klaida gaunant autorius:', error);
        }
      };

       const handleDelete = async (id) => {
          try {
            await axios.delete(`/authors/${id}`);
             fetchAuthors();
         } catch (error) {
           console.error('Klaida trinant autorių:', error);
       }
      };


        return (
          <div>
      <h2>Autorių sąrašas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vardas</th>
            <th>Knygos</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>
                {author.books && author.books.length > 0 ? (
                  <ul>
                    {author.books.map((book) => (
                      <li key={book.id}>{book.name}</li>
                    ))}
                  </ul>
                ) : (
                  "Neturi knygų"
                )}
              </td>
              <td>
                <Link to={`/authors/edit/${author.id}`}>Redaguoti</Link>
                <button onClick={() => handleDelete(author.id)}>Trinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/authors/add" className="add-button">Pridėti autorių</Link>
    </div>
        );
    }

    export default AuthorList;