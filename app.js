

// document.getElementById("add-book").addEventListener("click", function() {
//     // handle adding a book
//     const newBook = new Book(title, author, pages, isCompleted)
//     myLibrary.addBook(newBook);
// })

function Book(title, author, pages, isCompleted) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isCompleted = isCompleted;

}

Book.prototype.toggleReadStatus = function () {
    this.isCompleted = !this.isCompleted;
}

function Library() {
    this.books = [];
    this.cardWrapper = document.querySelector(".card-wrapper");
}

Library.prototype.addBook = function (book) {
    this.books.push(book);
    this.render(book);
}

Library.prototype.removeBook = function(bookCard, index) {
    this.books.splice(index, 1);
    this.render(index);
};

Library.prototype.render = function (indexOrBook) {
    if (typeof indexOrBook === 'number') {
        const bookToRemove = this.cardWrapper.children[indexOrBook];
        this.cardWrapper.removeChild(bookToRemove);
    } else {
        const bookCard = createBookCard();
        populateBookCard(bookCard, indexOrBook, this.books.length - 1);
        this.cardWrapper.appendChild(bookCard);
    }
}

function createBookCard() {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    return bookCard;
}

function populateBookCard(bookCard, book, index) {
    

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = "\"" + book.title + "\"";
    bookCard.appendChild(title);

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = book.author;
    bookCard.appendChild(author);

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = "Pages: " + book.pages;
    bookCard.appendChild(pages);

    const toggleReadButton = document.createElement('button');
    toggleReadButton.classList.add('toggleReadButton');
    toggleReadButton.textContent = book.isCompleted ? 'Read' : 'Not read yet';
    toggleReadButton.addEventListener('click', function () {
        book.toggleReadStatus();
        toggleReadButton.textContent = book.isCompleted ? 'Read' : 'Not read';

        if (book.isCompleted) {
            toggleReadButton.classList.remove('not-read')
        } else {
            toggleReadButton.classList.add('not-read')
        }
    });
    bookCard.appendChild(toggleReadButton);
    
    const deleteBook = document.createElement('button');
    deleteBook.classList.add('delete-book');
    deleteBook.textContent = 'Delete';
    //deleteBook.setAttribute('data-index', index)
    bookCard.appendChild(deleteBook)

    // Add event listener to the delete button
    deleteBook.addEventListener('click', function (event) {
        //const bookIndex = event.target.getAttribute('data-index');
        const index = myLibrary.books.indexOf(book)
        myLibrary.removeBook(bookCard, index);
    })
}

// Function to handle form submission
document.getElementById("book-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isCompleted = document.getElementById("isCompleted").checked;

    const newBook = new Book(title, author, pages, isCompleted);
    myLibrary.addBook(newBook);

    document.getElementById("book-form").reset();

    // close modal after book has been added
    document.getElementById("modal").classList.add("hidden");
})

// --- Modals ---
// handle adding a new book that brings up the form
document.getElementById("add-book").addEventListener("click", function (event) {
    document.getElementById("modal").classList.remove("hidden");
})

// close modal when clicking outside the form
document.getElementById("overlay").addEventListener("click", function (event) {
    document.getElementById("modal").classList.add("hidden");
})

let startingBook = ["Lord of the Rings","JRR Tolkien", 345, true];

const newBook = new Book(...startingBook)

const myLibrary = new Library();
myLibrary.addBook(newBook);
