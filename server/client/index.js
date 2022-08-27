const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

const client = require('./client');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  client.listProducts({}, (err, data) => {
    if (!err) {
      res.json(data);
     
    }
  });
});



app.post('/add', (req, res) => {
  const payload = { name: req.body.name, price: req.body.price };
  
  client.createProduct(payload, (err, result) => {
    res.json(result);
  })
});


app.get('/product/:id', (req, res) => {
  const payload = { id: parseInt(req.params.id) };
 
  client.readProduct(payload, (err, result) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
});


app.put('/product/:id', (req, res) => {
  const payload = { id: parseInt(req.params.id), name: req.body.name, price: req.body.price };
  
  client.updateProduct(payload, (err, result) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
});


app.delete('/product/:id', (req, res) => {
  const payload = { id: parseInt(req.params.id) };
  
  client.deleteProduct(payload, (err, result) => {
    if (err) {
      res.json('That product does not exist.');
    } else {
      res.json(result);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listing on port 3000');
})



