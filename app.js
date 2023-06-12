

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

Book.prototype.toggleReadStatus = function() {
    this.isCompleted = !this.isCompleted;
}

function Library() {
    this.books = [];
    this.cardWrapper = document.querySelector(".card-wrapper");
}

Library.prototype.addBook = function(book) {
    this.books.push(book);
    this.render();
}

Library.prototype.removeBook = function(index) {
    this.books.splice(index, 1);
    this.render();
};

Library.prototype.render = function() {
    this.cardWrapper.innerHTML = '';

    this.books.forEach((book, index) => {
        bookCard = createBookCard();
        populateBookCard(bookCard, book ,index);
        this.cardWrapper.appendChild(bookCard);
    })

    
}

function createBookCard() {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    return bookCard;
}

function populateBookCard(bookCard, book, index) {
    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = book.author;
    bookCard.appendChild(author);

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = book.title;
    bookCard.appendChild(title);

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = book.pages;
    bookCard.appendChild(pages);

    const isCompleted = document.createElement('div');
    isCompleted.classList.add('read');
    isCompleted.textContent = book.isCompleted ? 'Has read' : 'Not read yet';
    bookCard.appendChild(isCompleted);

    // button to toggle read status
    const toggleReadStatusButton = document.createElement('button');
    toggleReadStatusButton.textContent = 'Toggle Read Status';
    toggleReadStatusButton.addEventListener('click', function() {
        book.toggleReadStatus();
        isCompleted.textContent = book.isCompleted ? 'Has read' : 'Not read'
    });
    bookCard.appendChild(toggleReadStatusButton);

    const deleteBook = document.createElement('button');
    deleteBook.classList.add('delete-book');
    deleteBook.textContent = 'Delete';
    deleteBook.setAttribute('data-index', index)
    bookCard.appendChild(deleteBook)

    // Add event listener to the delete button
    deleteBook.addEventListener('click', function(event) {
        const bookIndex = event.target.getAttribute('data-index');
        myLibrary.removeBook(bookIndex);
    })
}

// Function to handle form submission
document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isCompleted = document.getElementById("isCompleted").checked;

    const newBook = new Book(title, author, pages, isCompleted);
    myLibrary.addBook(newBook);

    // clear the input fields after submission
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("isCompleted").checked = false;

    // close modal after book has been added
    document.getElementById("modal").classList.add("hidden");
})

// --- Modals ---
// handle adding a new book that brings up the form
document.getElementById("add-book").addEventListener("click", function(event) {
    document.getElementById("modal").classList.remove("hidden");
})

// close modal when clicking outside the form
document.getElementById("overlay").addEventListener("click", function(event) {
    document.getElementById("modal").classList.add("hidden");
})

let startingBook =  {
    title: "Lord of the Rings",
    author: "JRR Tolkien",
    pages: 345,
    isCompleted: true,
};

const myLibrary = new Library();
myLibrary.addBook(startingBook);
