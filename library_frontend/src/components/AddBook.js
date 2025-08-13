// import React, { useState, useEffect } from 'react';
// import { fetchAuthors, fetchGenres, createBook } from '../api/api';
// import { useNavigate } from 'react-router-dom';

// function AddBook() {
//   const [title, setTitle] = useState('');
//   const [isbn, setIsbn] = useState('');
//   const [publishYear, setPublishYear] = useState('');
//   const [description, setDescription] = useState('');
//   const [authorId, setAuthorId] = useState('');
//   const [genreId, setGenreId] = useState('');
//   const [authors, setAuthors] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [error, setError] = useState('');
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadAuthorsAndGenres = async () => {
//       const a = await fetchAuthors();
//       const g = await fetchGenres();
//       setAuthors(a.data);
//       setGenres(g.data);
//     };
//     loadAuthorsAndGenres();

//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert('You must be logged in to add a book');

//     try {
//       await createBook({
//         title,
//         isbn,
//         publish_year: Number(publishYear),
//         description,
//         author_id: authorId,
//         genre_id: genreId,
//         user_id: user.id, // attach current user
//       });
//       navigate('/books');
//     } catch (err) {
//       setError('Error adding book. Check your data.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto', paddingTop: 20 }}>
//       <h2>Add New Book</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label><br />
//           <input value={title} onChange={e => setTitle(e.target.value)} required />
//         </div>
//         <div>
//           <label>ISBN:</label><br />
//           <input value={isbn} onChange={e => setIsbn(e.target.value)} required />
//         </div>
//         <div>
//           <label>Publication Year:</label><br />
//           <input
//             type="number"
//             value={publishYear}
//             onChange={e => setPublishYear(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label><br />
//           <textarea value={description} onChange={e => setDescription(e.target.value)} />
//         </div>
//         <div>
//           <label>Author:</label><br />
//           <select value={authorId} onChange={e => setAuthorId(e.target.value)} required>
//             <option value="">Select Author</option>
//             {authors.map(a => (
//               <option key={a.id} value={a.id}>{a.name}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Genre:</label><br />
//           <select value={genreId} onChange={e => setGenreId(e.target.value)} required>
//             <option value="">Select Genre</option>
//             {genres.map(g => (
//               <option key={g.id} value={g.id}>{g.name}</option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" style={{ marginTop: 10 }}>Add Book</button>
//       </form>
//     </div>
//   );
// }

// export default AddBook;



// AddBook.js
import React, { useState, useEffect } from 'react';
import { fetchAuthors, fetchGenres, createBook } from '../api/api';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuthorsAndGenres = async () => {
      try {
        const a = await fetchAuthors();
        const g = await fetchGenres();
        setAuthors(a.data);
        setGenres(g.data);
      } catch (err) {
        console.error('Error loading authors/genres:', err);
      }
    };
    loadAuthorsAndGenres();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in to add a book');

    try {
      await createBook({
        title,
        isbn,
        publish_year: Number(publishYear),
        description,
        author_id: authorId,
        genre_id: genreId,
        user_id: user.id, // attach current user
      });
      navigate('/books');
    } catch (err) {
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
          <label>Author:</label><br />
          <select
            value={authorId}
            onChange={e => setAuthorId(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          >
            <option value="">Select Author</option>
            {authors.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Genre:</label><br />
          <select
            value={genreId}
            onChange={e => setGenreId(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          >
            <option value="">Select Genre</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ marginTop: 10, padding: '8px 16px' }}>
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
