import { useState } from 'react'
import './App.css'

function App() {
  // The book list now lives in "state" so it can change
  const [books, setBooks] = useState([
    { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', price: 5000 },
    { id: 2, title: 'Une si longue lettre', author: 'Mariama Bâ', price: 3500 },
    { id: 3, title: 'Le Vieux Nègre et la Médaille', author: 'Ferdinand Oyono', price: 4000 },
  ])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')
  // Which book is being edited (null = none), and its temporary values
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editAuthor, setEditAuthor] = useState('')
  const [editPrice, setEditPrice] = useState('')
  // Runs when the user clicks "Add Book"
  function handleAddBook() {
    if (title === '' || author === '' || price === '') {
      return // do nothing if a field is empty
    }
    const newBook = {
      id: Date.now(),          // a simple unique id
      title: title,
      author: author,
      price: Number(price),    // convert text to a number
    }
    setBooks([...books, newBook])  // add the new book to the list
    setTitle('')                   // clear the fields
    setAuthor('')
    setPrice('')
  }

  // Removes the book whose id matches
  function handleDeleteBook(id) {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <div>
      <h1>📚 Bookshop Inventory</h1>

      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
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

  // Click "Edit": remember which book, and pre-fill its current values
  function handleStartEdit(book) {
    setEditingId(book.id)
    setEditTitle(book.title)
    setEditAuthor(book.author)
    setEditPrice(book.price)
  }

  // Click "Save": update that book in the list
  function handleSaveEdit(id) {
    setBooks(books.map((book) =>
      book.id === id
        ? { ...book, title: editTitle, author: editAuthor, price: Number(editPrice) }
        : book
    ))
    setEditingId(null) // leave edit mode
  }

  // Click "Cancel": just leave edit mode, change nothing
  function handleCancelEdit() {
    setEditingId(null)
  }
}

export default App