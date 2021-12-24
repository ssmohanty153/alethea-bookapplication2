const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");
var path = require('path');
const app = express();
const port = 4000;
let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publish_date": "2014-12-14",
    "publisher": "No Starch Press",
    "numOfPages": 472,
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "publish_date": "2012-07-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 254,
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    "publish_date": "2014-02-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 460,
}];
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(express.static('./'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });
 

app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.get('/books', (req, res) => {
    res.json(books);
})
app.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    books.push(book);
    res.sendFile(path.join(__dirname + '/book-list.html'));
});
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });

    res.send('Book is deleted');
});
app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    for (let i = 0; i < books.length; i++) {
        let book = books[i]
        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
});

app.listen(port, () => console.log(`Book app listening on port ${port}!`))