import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
export { default as BookList } from './BookList';
export { default as BookForm } from './BookForm';
export { default as AuthorList } from './AuthorList';
export { default as AuthorForm } from './AuthorForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);

