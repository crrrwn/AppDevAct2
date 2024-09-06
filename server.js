const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

let items = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { items });
});

app.get('/items/new', (req, res) => {
    res.render('create');
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.redirect('/');
});

app.get('/items/:id/edit', (req, res) => {
    const itemId = req.params.id;
    const item = items[itemId];
    res.render('edit', { item, id: itemId });
});

app.post('/items/:id', (req, res) => {
    const itemId = req.params.id;
    items[itemId] = req.body.item;
    res.redirect('/');
});

app.post('/items/:id/delete', (req, res) => {
    const itemId = req.params.id;
    items.splice(itemId, 1);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
