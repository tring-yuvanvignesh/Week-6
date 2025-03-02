const express = require('express')
const cors = require('cors')
const startServer = require('./Routes/graphql')


const app = express()

app.use(cors())
app.use(express.json())

startServer(app)

app.listen(4000, () => {
    console.log("Server running in port number 4000");
})