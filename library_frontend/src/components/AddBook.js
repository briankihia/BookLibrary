import React, { useState, useEffect } from 'react';
import { createBook } from '../api/api';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook({
        title,
        isbn,
        publish_year: Number(publishYear),
        description,
        author_name: authorName,
        genre_name: genreName,
        ...(user?.id ? { user_id: user.id } : {}),
      });
      navigate('/books');
    } catch (err) {
      console.error(err);
      setError('Error adding book. Check your data.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', paddingTop: 20 }}>
      <h2>Add New Book</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div>
          <label>ISBN:</label><br />
          <input
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div>
          <label>Publication Year:</label><br />
          <input
            type="number"
            value={publishYear}
            onChange={e => setPublishYear(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div>
          <label>Author Name:</label><br />
          <input
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div>
          <label>Genre Name:</label><br />
          <input
            value={genreName}
            onChange={e => setGenreName(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ marginTop: 10, padding: '8px 16px' }}>
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
