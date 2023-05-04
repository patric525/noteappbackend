const express = require('express')
const app = express()
const cors = require('cors')


require('./db/connection')

app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/notes'))


app.get('/', async(req,res)=>[
    res.send('home')
])


app.listen('5000' , ()=>{
    console.log('server started at port 5000');
})