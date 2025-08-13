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



// BookList.jsimport React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api/api';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  // Get logged-in user info from localStorage/session
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // set this when user logs in
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const loadBooks = async () => {
    const params = search ? { search } : {};
    const res = await fetchBooks(params);

    if (user) {
      // Only show books added by this user
      const myBooks = (res.data.data || res.data).filter(
        (book) => book.user && book.user.id === user.id
      );
      setBooks(myBooks);
    } else {
      setBooks([]);
    }
  };

  useEffect(() => {
    if (user) {
      loadBooks();
    }
  }, [user]);

  const handleSearch = async () => {
    await loadBooks();
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', paddingTop: 20 }}>
      <h2>My Books</h2>
      <input
        placeholder="Search in my collection"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: 8 }}
      />
      <button onClick={handleSearch} style={{ marginTop: 10, marginBottom: 20 }}>
        Search
      </button>

      <Link to="/books/add">➕ Add New Book</Link>

      <ul>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: 10 }}>
            <Link to={`/books/${book.id}`}>
              <b>{book.title}</b> ({book.publish_year})
            </Link>
          </li>
        ))}
      </ul>

      {books.length === 0 && <p>No books in your collection yet.</p>}
    </div>
  );
}

export default BookList;
