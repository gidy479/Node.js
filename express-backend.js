const express = require('express')
const server = express()
const PORT = 5000


//Handlers
const handleCreate = (req, res) => {
    res.send('Data is created successfully')
}

const handleRetrieve = (req, res) => {
    res.send('Data is being retrieved ')
}

const handlePut = (req, res) => {
    res.send('Data is being updated ')
}

const handleDelete = (req, res) => {
    res.send('Data is being deleted ')
}

//Routing/Methods
server.post('/', handleCreate)
server.get('/about', handleRetrieve)
server.put('/contact', handlePut)
server.delete('/gallery', handleDelete)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
