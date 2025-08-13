import React, { useState, useEffect } from 'react';
import { fetchBooks } from './api';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const loadBooks = async () => {
    const params = search ? { search } : {};
    const res = await fetchBooks(params);
    setBooks(res.data.data || res.data); // depending on pagination structure
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSearch = async () => {
    await loadBooks();
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', paddingTop: 20 }}>
      <h2>Books</h2>
      <input
        placeholder="Search by title or author"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: 8 }}
      />
      <button onClick={handleSearch} style={{ marginTop: 10, marginBottom: 20 }}>
        Search
      </button>

      <Link to="/books/add">Add New Book</Link>

      <ul>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: 10 }}>
            <Link to={`/books/${book.id}`}>
              <b>{book.title}</b> by {book.author.name} ({book.publish_year})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
