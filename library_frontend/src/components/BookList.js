// import React, { useState, useEffect } from 'react';
// import { fetchBooks } from '../api/api';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../pages/axios'; // use your pre-configured axios

// function BookList() {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const loadBooks = async () => {
//     if (!user) return;
//     const params = search ? { search, user_id: user.id } : { user_id: user.id };
//     const res = await fetchBooks(params);
//     setBooks(res.data.data || res.data); // adjust for pagination
//   };

//   useEffect(() => {
//     loadBooks();
//   }, [user]);

//   const handleSearch = async () => {
//     await loadBooks();
//   };

//   const handleDeleteBook = async (id) => {
//     if (window.confirm('Are you sure you want to delete this book?')) {
//       try {
//         await axiosInstance.delete(`/api/books/${id}/`);
//         setBooks(books.filter((book) => book.id !== id));
//       } catch (err) {
//         console.error(err);
//         alert('Error deleting book.');
//       }
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto', paddingTop: 20 }}>
//       <h2>My Books</h2>
//       <input
//         placeholder="Search by title or author"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ width: '100%', padding: 8 }}
//       />
//       <button onClick={handleSearch} style={{ marginTop: 10, marginBottom: 20 }}>
//         Search
//       </button>

//       <Link to="/books/add">Add New Book</Link>

//       <ul>
//         {books.map((book) => (
//           <li key={book.id} style={{ marginBottom: 10 }}>
//             <Link to={`/books/${book.id}`}>
//               <b>{book.title}</b> by {book.author.name} ({book.publish_year})
//             </Link>
//             {book.user && user && book.user.id === user.id && (
//               <button
//                 onClick={() => handleDeleteBook(book.id)}
//                 style={{ marginLeft: 10, color: 'white', background: 'red', border: 'none', padding: '5px 10px' }}
//               >
//                 Delete
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BookList;

// src/pages/BookList.js
import React, { useState, useEffect } from 'react';
import { fetchBooks, deleteBook } from '../api/api';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [me, setMe] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // adjust if you store differently
    if (storedUser) setMe(storedUser);
  }, []);

  const onlyMine = (items) => {
    if (!me) return [];
    return (items || []).filter((b) => {
      if (!b.user) return false;
      // Support both shapes: user is ID or user object
      const userId = typeof b.user === 'number' ? b.user : b.user.id;
      return userId === me.id;
    });
  };

  const loadBooks = async () => {
    const params = search ? { search } : {};
    const res = await fetchBooks(params);
    const list = res.data?.data || res.data || [];
    setBooks(onlyMine(list));
  };

  useEffect(() => {
    if (me) loadBooks();
  }, [me]);

  const handleSearch = async () => {
    await loadBooks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      console.error(e);
      alert('Error deleting book.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto', paddingTop: 20 }}>
      <h2 style={{ marginBottom: 8 }}>📚 My Books</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Search my books (title/author)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSearch} style={{ padding: '8px 16px' }}>
          Search
        </button>
        <Link to="/books/add" style={{ marginLeft: 'auto', alignSelf: 'center' }}>
          ➕ Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p>You haven’t added any books yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {books.map((book) => (
            <li
              key={book.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                padding: 14,
                marginBottom: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{book.title}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    by {book.author?.name} • {book.publish_year} • ISBN: {book.isbn}
                  </div>
                </div>
              </Link>

              <button
                onClick={() => handleDelete(book.id)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
