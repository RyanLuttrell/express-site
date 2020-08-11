const express = require('express');
const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index');
})

app.get('/about', (req, res, next) => {
    res.render('about')
})

app.get('/projects/:id', (req, res, next) => {

})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});