# 📚 Book Library App

> A personal digital library where each user manages **only their own books** — add, view, and delete books in your private collection.  
Built with **Django REST Framework** (Backend) & **React.js** (Frontend).

---

## 🌟 Features

- 🔒 **User-Specific Collections** – See only the books you have added.
- ➕ **Add Books** – Title, ISBN, Publication Year, Description, Author, Genre.
- 🗑 **Delete Books** – Remove books from your personal collection.
- 🔍 **Search Books** – Filter your books by title or author.
- 🖼 **Responsive UI** – Works beautifully on mobile and desktop.
- 🚀 **Fast & Interactive** – Powered by React and REST APIs.

---

## 🛠 Tech Stack

**Frontend:**
- ⚛ React.js
- 🎨 Bootstrap / Custom CSS
- 🌐 Axios (API requests)

**Backend:**
- 🐍 Django REST Framework
- 🗄 SQLite / PostgreSQL
- 🔑 JWT Authentication

---

## 📂 Project Structure

Book_Library_app/
│
├── library_backend/ # Django backend
│ ├── accounts/ # User authentication
│ ├── library/ # Book models & APIs
│
├── library_frontend/ # React frontend
│ ├── src/
│ ├── components/ # AddBook, BookList, BookDetails
│ ├── api/ # Axios API setup
│
└── README.md

yaml
Copy
Edit

---

## ⚡ Getting Started

### 1️⃣ Backend Setup (Django)
```bash
cd library_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
2️⃣ Frontend Setup (React)
bash
Copy
Edit
cd library_frontend
npm install
npm start
🔑 Authentication
Sign Up / Login via API or frontend.

JWT tokens are stored locally to identify the logged-in user.

Every API request requires authentication headers.

Example Auth Header:

json
Copy
Edit
{
  "Authorization": "Bearer <your_token_here>"
}
🖼 Screenshots
📋 My Book Collection

➕ Add Book Form

📌 API Endpoints
Method	Endpoint	Description	Auth Required
GET	/api/books/	List logged-in user's books	✅
POST	/api/books/	Add a new book	✅
GET	/api/books/:id/	Get book details	✅
DELETE	/api/books/:id/	Delete a book	✅

🎯 Future Improvements
📤 Book image uploads

📊 Book reading statistics

🌍 Multi-language support

🔍 Advanced search filters

👨‍💻 Author
Brian John
💼 Passionate full-stack developer | 💡 Problem Solver | 🚀 Always learning

📧 Email: your.email@example.com
🌐 GitHub: briankihia

📝 “A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” – George R.R. Martin