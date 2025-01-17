import React, { useState, useEffect } from 'react';
import axios from '../../AxiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

function AuthorForm({ isEdit = false }) {
 const { id } = useParams();
 const navigate = useNavigate();
 const [name, setName] = useState('');

useEffect(() => {
  if (isEdit && id) {
   fetchAuthor();
 }
}, [id, isEdit]);

const fetchAuthor = async () => {
   try {
     const response = await axios.get(`/authors/${id}`);
     setName(response.data.name);
 } catch (error) {
     console.error('Klaida gaunant autorių:', error);
 }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isEdit) {
       await axios.put(`/authors/${id}`, { name });
    } else {
       await axios.post('/authors', { name });
   }
  navigate('/authors');
} catch (error) {
 console.error('Klaida išsaugant autorių:', error);
}};
return (
    <form onSubmit={handleSubmit}>
       <h2>{isEdit ? 'Redaguoti autorių' : 'Pridėti autorių'}</h2>
        <div>
          <label>Vardas:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
       </div>
     <button type="submit">{isEdit ? 'Redaguoti' : 'Pridėti'}</button>
   </form>
  );
}

 export default AuthorForm;

