class Book {
    constructor(title, author, pages, isCompleted) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isCompleted = isCompleted;

    }
    toggleReadStatus() {
        this.isCompleted = !this.isCompleted;
    }
}

class BookCard {
    constructor(book, onRemove) {
        this.book = book;
        this.element = this.createBookCard(onRemove);
    }

    createBookCard(onRemove) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = `"${this.book.title}"`;
        bookCard.appendChild(title);

        const author = document.createElement("div");
        author.classList.add('author');
        author.textContent = this.book.author;
        bookCard.appendChild(author);

        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = `Pages: ${this.book.pages}`;
        bookCard.appendChild(pages);

        const toggleReadButton = document.createElement("button");
        toggleReadButton.classList.add("toggleReadButton");
        toggleReadButton.textContent = this.book.isCompleted ? "Read" : "Not Read Yet";
        if (!this.book.isCompleted) {
            toggleReadButton.classList.add('not-read');
        }
        toggleReadButton.addEventListener('click', () => {
            this.book.toggleReadStatus();
            toggleReadButton.textContent = this.book.isCompleted ? 'Read' : 'Not read';
            if (this.book.isCompleted) {
                toggleReadButton.classList.remove('not-read');
            } else {
                toggleReadButton.classList.add('not-read');
            }
        });
        bookCard.appendChild(toggleReadButton);

        const deleteBook = document.createElement('button');
        deleteBook.classList.add('delete-book');
        deleteBook.textContent = 'Delete';
        deleteBook.addEventListener('click', () => onRemove(this.book));
        bookCard.appendChild(deleteBook);

        return bookCard;
    }

    updateIndex(newIndex) {
        this.index = newIndex;
    }
}


class Library {
    constructor() {
        this.books = [];

    };

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

}

class ScreenController {
    constructor(library) {
        this.library = library;
        this.cardWrapper = document.querySelector(".card-wrapper");
    }

    addBook(book) {
        const bookCard = new BookCard(book, this.removeBook.bind(this));
        this.cardWrapper.appendChild(bookCard.element);
    }

    removeBook(book) {
        const index = this.library.books.indexOf(book);
        if (index > -1) {
            this.library.removeBook(index);
            this.cardWrapper.removeChild(this.cardWrapper.children[index]);
        }
    }
}

const myLibrary = new Library();
const screenController = new ScreenController(myLibrary);

// handle book form submission
document.getElementById("book-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isCompleted = document.getElementById("isCompleted").checked;

    const newBook = new Book(title, author, pages, isCompleted);
    myLibrary.addBook(newBook);
    screenController.addBook(newBook);

    document.getElementById("book-form").reset();
    document.getElementById("modal").classList.add("hidden");
})

// handle adding a new book and bringing up the modal
document.getElementById("add-book").addEventListener("click", function () {
    document.getElementById("modal").classList.remove("hidden");
})

// add overlay so user can click outside form box and go back to library
document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("modal").classList.add("hidden");
})

// Adding a starting book as an example
const startingBook = ["Lord of the Rings", "J.R.R Tolkien", 345, true];
const newBook = new Book(...startingBook);
myLibrary.addBook(newBook);
screenController.addBook(newBook);
