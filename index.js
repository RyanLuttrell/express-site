const express = require('express');
const bodyParser = require('body-parser');
const {projects} = require('./data.json');
const { render } = require('pug');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {projects});
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if (!projectId) {
        res.redirect('error')
    } else {
        res.render('project', {project});
    }
});


// app.get('/error', (err, req, res, next) => {
//     res.locals.error = err;
//     res.render('error');
// })

app.use((req, res, next) => {
    console.log('The page you are looking for does not exist');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
  })


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});









