//? Usando express
const express = require('express')
//? 
const app = express()
const port = 9000

app.use(express.json())

const moviesDB = []

let id = 1


app.get('/', (req, res) => {
  res.json({
    message: 'OK'
  })
})

app.get('/movies', (req, res) => {
  res.status(200).json(moviesDB)
})

app.post('/movies', (req, res) => {
  const { title, description, director, year, duration } = req.body

  if (title && description && director && year && duration) {
    const moviesView = {
      id: id++,
      title,
      description,
      director,
      year,
      duration// en minutos ejemplo 60 30
    }
    moviesDB.push(moviesView)
    res.status(200).json({ moviesView })
  } else {
    res.status(400).json({ message: 'incorrect data💀', body: res.body })
  }
})
app.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = moviesDB.find(movie => movie.id == id)
  if (movie) {
    res.status(200).json(movie)
  }
  else {
    res.status(404).json({ message: 'invalid id😭' })
  }
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})





