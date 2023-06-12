const cardwrapper = document.querySelector(".card-wrapper")

// let book = {
//     title: "Mystery",
//     author: "ned stranger",
//     pages: 445,
//     isCompleted: false,
// }

let myLibrary = [
    {
        title: "Lord of the Rings",
        author: "JRR Tolkien",
        pages: 345,
        isCompleted: true,
    }
];

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
        removeBookFromLibrary(bookIndex);
    })

    


}

function removeBookFromLibrary(index) {
    //Remove the book from the library array
    myLibrary.splice(index, 1);

    //render the book list
    const cardWrapper = document.querySelector('.card-wrapper');
    cardWrapper.textContent = '';
    displayBooks(myLibrary);
}

function appendBookCardToWrapper(bookCard) {
    cardwrapper.appendChild(bookCard);
}

function Book(title, author, pages, isCompleted) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isCompleted = isCompleted;

}

Book.prototype.toggleReadStatus = function() {
    this.isCompleted = !this.isCompleted;
}

function addBookToLibrary(title, author, pages, isCompleted) {
    // do stuff here
    const newBook = new Book(title, author, pages, isCompleted);
    myLibrary.push(newBook)
}

function displayBooks(library) {
    library.forEach((book, index) => {
        const bookCard = createBookCard();
        populateBookCard(bookCard, book, index);
        appendBookCardToWrapper(bookCard);
    });
}

// Function to handle form submission
document.getElementById("book-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isCompleted = document.getElementById("isCompleted").checked;

    addBookToLibrary(title, author, pages, isCompleted);

    // clear the input fields after submission
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("isCompleted").checked = false;

    // Re-render the book list to include the new book
    cardwrapper.textContent = ""; // Clear existing book cards
    displayBooks(myLibrary);

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

// addBookToLibrary(book);
displayBooks(myLibrary);