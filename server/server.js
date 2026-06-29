import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const app = express()
app.use(cors())
app.use(express.json())

// Open (or create) the database file
const db = new Database('bookshop.db')

// Create the books table if it doesn't exist yet
db.prepare(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL
  )
`).run()

// GET all books
app.get('/books', (req, res) => {
    const books = db.prepare('SELECT * FROM books').all()
    res.json(books)
})

// POST a new book
app.post('/books', (req, res) => {
    const { title, author, price } = req.body
    const result = db.prepare(
        'INSERT INTO books (title, author, price) VALUES (?, ?, ?)'
    ).run(title, author, price)
    res.json({ id: result.lastInsertRowid, title, author, price })
})

// PUT (update) a book
app.put('/books/:id', (req, res) => {
    const { title, author, price } = req.body
    db.prepare(
        'UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?'
    ).run(title, author, price, req.params.id)
    res.json({ id: Number(req.params.id), title, author, price })
})

// DELETE a book
app.delete('/books/:id', (req, res) => {
    db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id)
    res.json({ success: true })
})

app.listen(3001, () => {
    console.log('✅ Server running on http://localhost:3001')
})