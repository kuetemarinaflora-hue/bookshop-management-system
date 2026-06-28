
import './App.css'

function App() {
  // Our fake book data for now — later this comes from the database
  const books = [
    { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', price: 5000 },
    { id: 2, title: 'Une si longue lettre', author: 'Mariama Bâ', price: 3500 },
    { id: 3, title: 'Le Vieux Nègre et la Médaille', author: 'Ferdinand Oyono', price: 4000 },
  ]

  return (
    <div>
      <h1>📚 Bookshop Inventory</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> — {book.author} ({book.price} FCFA)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App  