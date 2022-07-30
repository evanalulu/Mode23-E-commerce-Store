const express = require('express')

const bodyparser = require('body-parser')

const stripe = require('stripe')('sk_test_51KTUkmAWz0nFYQqCQIM7eiqrtq4sfLF9Ids2U1ipJ8XnNvHCkTfQKhl91rwQC9dEFUiW299TnkykaHaJPK79pnt300XzaD83Fj');

const uuid = require('uuid').v4

const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

const PORT = process.env.PORT || 5000

app.post('/checkout', (req,res) => {
    console.log(req.body)

})

app.listen(PORT, () => {
    console.log('App is listening')
})