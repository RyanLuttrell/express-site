const express = require('express');
const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index');
    res.locals = data.projects;
})

app.get('/about', (req, res, next) => {
    res.render('about')
})

app.get('/projects/:id', (req, res, next) => {

})

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});