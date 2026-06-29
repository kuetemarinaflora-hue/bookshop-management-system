import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:3001/books'

function App() {
  const [books, setBooks] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editAuthor, setEditAuthor] = useState('')
  const [editPrice, setEditPrice] = useState('')

  // Load books from the database when the app starts
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setBooks(data))
  }, [])

  // ADD a book (save to database)
  function handleAddBook() {
    if (title === '' || author === '' || price === '') return
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, price: Number(price) }),
    })
      .then((res) => res.json())
      .then((newBook) => {
        setBooks([...books, newBook])
        setTitle('')
        setAuthor('')
        setPrice('')
      })
  }

  // DELETE a book (remove from database)
  function handleDeleteBook(id) {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => setBooks(books.filter((book) => book.id !== id)))
  }

  function handleStartEdit(book) {
    setEditingId(book.id)
    setEditTitle(book.title)
    setEditAuthor(book.author)
    setEditPrice(book.price)
  }

  // SAVE an edit (update in database)
  function handleSaveEdit(id) {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, author: editAuthor, price: Number(editPrice) }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setBooks(books.map((book) => (book.id === id ? updated : book)))
        setEditingId(null)
      })
  }

  function handleCancelEdit() {
    setEditingId(null)
  }

  return (
    <div>
      <h1>📚 Bookshop Inventory</h1>

      <div className="form-container">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {editingId === book.id ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
                <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                <button onClick={() => handleSaveEdit(book.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  <strong>{book.title}</strong> — {book.author} ({book.price} FCFA)
                </span>
                <span>
                  <button onClick={() => handleStartEdit(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App