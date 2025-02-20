const express = require('express')

const server = express()
const PORT = 5000

//handlers
const handleCreate = (req, res) =>{
    res.send('Data is  created')
}
const handleRetrieve =(req, res) =>{
    res.send('Data is  retrieved')
}
const handlePut =(req, res) =>{
    res.send('Data is added')
}
const handleDelete =(req, res) =>{
    res.send('Data is  deleted')
}

//routes and methods
server.post("/", handleCreate);
server.get("/about", handleRetrieve);
server.put("/contact", handlePut);
server.delete("/service", handleDelete);

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})