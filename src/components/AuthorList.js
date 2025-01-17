import React, { useState, useEffect } from 'react';
    import axios from '../../AxiosConfig';
     import { Link } from 'react-router-dom';

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
                <ul>
                    {authors.map((author) => (
                        <li key={author.id}>
                            {author.name}
                            <Link to={`/authors/edit/${author.id}`}>Redaguoti</Link>
                            <button onClick={() => handleDelete(author.id)}>Trinti</button>
                        </li>
                    ))}
                </ul>
               <Link to="/authors/add">Pridėti autorių</Link>
            </div>
        );
    }

    export default AuthorList;