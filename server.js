const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(express.json())

MongoClient.connect(process.env.DB_STRING)
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('fav-foods')
    const foodCollection = db.collection('foods')

    app.get('/', (req, res) => {
        db.collection('foods')
            .find()
            .toArray()
            .then(results => {
            res.render('index.ejs', { foods: results })
        })
            .catch(error => console.error(error))
        })

    
    app.post('/foods', (req, res) => {
    foodCollection
    .insertOne(req.body)
    .then(result => {
      res.redirect('/')
      console.log(result)
    })
    .catch(error => console.error(error))


    })

    app.put('/foods', (req, res) => {
        console.log(req.body)
        foodCollection
        .findOneAndUpdate(
            { food: 'Pasta' },
            {
            $set: {
                name: req.body.name,
                food: req.body.food,
            },
            },
            {
            upsert: true,
            },
        )
        .then(result => {
            res.json('Success')
            console.log(result)
        })
        .catch(error => console.error(error))
        })
        
        app.delete('/foods', (req, res) => {
        foodCollection
            .deleteOne({ food: req.body.food })
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No Food Master Pizza to delete')
                }
                res.json(`Deleted Pizza`)
            })
            .catch(error => console.error(error))
        })

        app.listen(3000, function () {
        console.log('listening on 3000')
        })
  })
  .catch(console.error)



