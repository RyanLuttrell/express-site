const exress = require('express');
const data = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res, next) => {

})

app.get('/about', (req, res, next) => {
    res.render('about')
})

app.get('/projects/:id', (req, res, next) => {

})