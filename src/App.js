import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BookList, BookForm } from './components/books';
import { AuthorList, AuthorForm } from './components/authors';

function App() {
  return (
    <Router>
<div>
<nav>
<ul>
<li><Link to="/books">Knygos</Link></li>
<li><Link to="/authors">Autoriai</Link></li>
</ul>
</nav>
<Routes>
<Route path="/books" element={<BookList />} />
<Route path="/books/add" element={<BookForm />} />
<Route path="/books/edit/:id" element={<BookForm isEdit={true} />} />
<Route path="/authors" element={<AuthorList />} />
<Route path="/authors/add" element={<AuthorForm />} />
<Route path="/authors/edit/:id" element={<AuthorForm isEdit={true} />} />
</Routes>
</div>
</Router>
  );
}

export default App;
