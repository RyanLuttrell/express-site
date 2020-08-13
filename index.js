//Get all of the required files into the document
const express = require('express');

const {projects} = require('./data.json');
const { render } = require('pug');

//Set up express to run the app
const app = express();

//Allow the app to access static files in the public directory
app.use('/static', express.static('public'));

//Select the templating engine to be Pug
app.set('view engine', 'pug');

//Render index.pug as the home directory
app.get('/', (req, res) => {
    res.render('index', {projects});
})

//Render about.pug as the /about directory
app.get('/about', (req, res) => {
    res.render('about')
})

//Render the project.pug template based on the appropriate selected project
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if (!projectId) {
        res.redirect('error')
    } else {
        res.render('project', {project});
    }
});

//Handle any errors that may occur
app.use((req, res, next) => {
    console.log('The page you are looking for does not exist');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

//Render error.pug whenever we are note able to find the specific page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
})

//Listen at the local host 3000 for the app to run
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});









