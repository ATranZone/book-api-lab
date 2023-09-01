const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path= require('path');

const app = express();
const port = 3000;


//where we will keep books
let books = [];

app.use(cors());

//configuring body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    //we will be coding here
    const book = req.body;
    console.log(book);
    books.push(book);

    // res.send('Book is added to the database');
    // res.sendFile(path.join(__dirname, "/new-book.html"));
    res.redirect("./new-book")
})

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    console.log('post')
    //remove item from the books array
    
    for (let i = 0; i < books.length; i++){
        let book = books[i];
        if(book.isbn === isbn){
            books[i] = newBook;
        }
    }
    
    res.redirect("/book-list")
});

app.delete('/book/:isbn', (req, res) => {
    //we will be coding here
    console.log("in delete")
    const isbn = req.params.isbn;
    console.log(isbn)
    

    books = books.filter(function isISBNEqual(book){
        return book.isbn != isbn;
    })
    
    res.redirect(303,'/book-list') //303
});

app.get('/book', (req, res) => { //endpoint to get all books from the API
    res.json(books);
});

app.get('/book/:isbn', (req, res) => { //endpoint to get all books from the API
    res.json(books);
});

app.get('/book/:isbn', (req, res) => { //GET to read the data that we want in this case just the book we want to edit.
    const isbn = req.params.isbn;
    books = books.filter(function isISBNEqual(book){
        return book.isbn === isbn;
    })
    res.json(books);
});

app.get('/book-list', (req, res) => {
    res.sendFile(path.join(__dirname, "/book-list.html"));
})

app.get('/new-book', (req, res) => {
    res.sendFile(path.join(__dirname, "/new-book.html"));
})

app.get('/book-list.js', (req, res) => {
    res.sendFile(path.join(__dirname, "/book-list.js"));
})

app.listen(port, () => console.log('Hello world app listening on port'));