const express = require('express');
const bodyParser = require('body-parser');
const {projects} = require('./data.json');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
    res.render('index', {projects});
})

app.get('/about', (req, res, next) => {
    res.render('about')
})

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );

    if (project) {
        res.render('project', {project});
    } else {
        res.sendStatus(404);
    }
})

app.use((err, req, res, next) => {
    res.locals.error = err
    res.render('error', err);

  });

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});