const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

app.use(cors())
app.use(express.json())

/* Connecting to mongo DB */
mongoose.connect('mongodb://localhost:27017/SchoolDb-one')



//Register router
app.post('/api/users/register', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (error) {
       
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

// Login router
app.post('/api/users/login', async (req, res) => {
       const user =  await User.findOne({ 
            email: req.body.email, 
            passowrd: req.body.passowrd
        })

        if (user) {
            res.json({ status: 'ok', user: true })
        }else{
            return res.json({ status: 'error', user: false })
        }  
})

app.listen(8080, () => {
    console.log('server started on port 8080');
})
