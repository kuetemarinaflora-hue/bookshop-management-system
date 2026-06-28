import { useState } from 'react'
import './App.css'

function App() {
  // The book list now lives in "state" so it can change
  const [books, setBooks] = useState([
    { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', price: 5000 },
    { id: 2, title: 'Une si longue lettre', author: 'Mariama Bâ', price: 3500 },
    { id: 3, title: 'Le Vieux Nègre et la Médaille', author: 'Ferdinand Oyono', price: 4000 },
  ])

  // State for the three input fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')

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
            <strong>{book.title}</strong> — {book.author} ({book.price} FCFA)
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App