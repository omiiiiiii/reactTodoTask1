const connectToMongo=require('./db');
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port=5000;

connectToMongo();
app.use(express.json());
//Available routes
app.use('/api/todo',require('./routes/todo'))


app.get('/', (req, res) => { 
  res.send('hello Senorita')
})

app.listen(port,()=>{
    console.log(`Todo Backend app is listing on http://localhost:${port}`)
})