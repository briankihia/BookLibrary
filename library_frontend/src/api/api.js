// src/api/libraryApi.js
import axiosInstance from "../pages/axios";

// Auth
export const loginUser = (email, password) =>
  axiosInstance.post("/api/login/", { email, password });

// Authors
export const fetchAuthors = () => axiosInstance.get("/api/authors/");

// Genres
export const fetchGenres = () => axiosInstance.get("/api/genres/");

// Books
export const fetchBooks = (params) => axiosInstance.get("/api/books/", { params });
export const fetchBook = (id) => axiosInstance.get(`/api/books/${id}/`);
export const createBook = (bookData) => axiosInstance.post("/api/books/", bookData);
export const updateBook = (id, bookData) => axiosInstance.put(`/api/books/${id}/`, bookData);
export const deleteBook = (id) => axiosInstance.delete(`/api/books/${id}/`);

// Favorites
export const fetchFavorites = () => axiosInstance.get("/api/favorites/");
export const addFavorite = (bookId) => axiosInstance.post("/api/favorites/", { book: bookId });
export const removeFavorite = (bookId) => axiosInstance.delete(`/api/favorites/${bookId}/`);

// Ratings
export const fetchRatings = (bookId) =>
  axiosInstance.get("/api/ratings/", { params: { book_id: bookId } });
export const addRating = (ratingData) => axiosInstance.post("/api/ratings/", ratingData);
