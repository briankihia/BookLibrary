import React, { useState, useEffect } from 'react';
import { fetchBook, fetchRatings, addRating, fetchFavorites, addFavorite, removeFavorite } from './api';
import { useParams } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const loadBook = async () => {
    const res = await fetchBook(id);
    setBook(res.data);
  };

  const loadRatings = async () => {
    const res = await fetchRatings(id);
    setRatings(res.data);
  };

  const loadFavorites = async () => {
    const res = await fetchFavorites();
    setFavoriteBooks(res.data.map(fav => fav.book));
  };

  useEffect(() => {
    loadBook();
    loadRatings();
    loadFavorites();
  }, [id]);

  const handleAddRating = async () => {
    try {
      await addRating({ rating: ratingValue, review: reviewText, book: id });
      setRatingValue(5);
      setReviewText('');
      loadRatings();
    } catch {
      alert('Error adding rating. Maybe you already rated this book.');
    }
  };

  const toggleFavorite = async () => {
    if (favoriteBooks.includes(book.id)) {
      await removeFavorite(book.id);
    } else {
      await addFavorite(book.id);
    }
    loadFavorites();
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', paddingTop: 20 }}>
      <h2>{book.title}</h2>
      <p><b>Author:</b> {book.author.name}</p>
      <p><b>Genre:</b> {book.genre.name}</p>
      <p><b>Year:</b> {book.publish_year}</p>
      <p>{book.description}</p>

      <button onClick={toggleFavorite}>
        {favoriteBooks.includes(book.id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <hr />

      <h3>Ratings & Reviews</h3>
      <ul>
        {ratings.map(r => (
          <li key={r.id}>
            <b>{r.rating} stars</b> by {r.user.email}<br />
            {r.review}
          </li>
        ))}
      </ul>

      <h4>Add Your Rating</h4>
      <select value={ratingValue} onChange={e => setRatingValue(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <br />
      <textarea
        placeholder="Write a review (optional)"
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleAddRating}>Submit Rating</button>
    </div>
  );
}

export default BookDetail;
