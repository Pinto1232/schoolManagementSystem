const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/api/users/register', (req, res) => {
    console.log(req.body);
    res.json({ status: 'ok'})
})

app.listen(8080, () => {
    console.log('server started on port 8080');
} )