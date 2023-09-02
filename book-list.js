async function loadBooks () {
    let response = await fetch("http://localhost:3000/book");

    console.log(response.status); // 200
    console.log(response.statusText); // OK
    
    if(response.status === 200){
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);
        console.log(books);

        for(let book of books){
            // we use ` `(back ticks which is a feature called template literals) because they represent multi-line strings and may use interpolation to insert variables
            const x = `
                <div class="col-4" id="col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number of pages: ${book.pages}</div>

                            <hr></hr>
                            
                            <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
                            <button type="action" class="btn btn-primary" data-toggle="modal" data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                                Edit
                            </button>
                            
                        </div>
                    </div>
                </div>
            `

            document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
        }
    }

}

loadBooks();

async function setEditModal (isbn) {
    let response = await fetch(`http://localhost:3000/book/${isbn}`, {method: "GET"}); //use GET to only read data
    console.log(response.status); //200
    console.log(response.statusText); //OK

    //console.log(isbn);
    if(response.status === 200){
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);
        const book = books.filter((book) => {
            return book.isbn == isbn
        })
        const{
            title,
            author,
            publisher,
            published,
            pages
        } = book[0]
        
        document.getElementById('isbn').value = isbn;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publisher').value = publisher;
        document.getElementById('publish_date').value = published;
        document.getElementById('numOfPages').value = pages;
        
        //setting up the action url for the book
        
        document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;  //this is gonna POST to app.post('/book/:isbn'......
       
    }
}

async function deleteBook(isbn){
    let response = await fetch(`http://localhost:3000/book/${isbn}`, {method: "DELETE"});
    console.log(response.status); //200
    console.log(response.statusText); //OK
    
    if(response.status === 200){
        let bookToRemove = document.getElementById("col");

        // console.log(data);

        if(bookToRemove.parentNode){
            bookToRemove.parentNode.removeChild(bookToRemove)
        }
        //next thing to do is to remove the book from the book array in the api
        //in the html somewhere do a http DELETE method
        
    }
    
}