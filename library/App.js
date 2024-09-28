class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

const library = [];

// Function to display books
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    library.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button data-index="${index}" class="toggleReadBtn">Toggle Read Status</button>
            <button data-index="${index}" class="removeBookBtn">Remove</button>
        `;
        bookList.appendChild(bookCard);
    });
}

// Function to add a book
function addBook(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    library.push(newBook);
    displayBooks();
}

// Event listener for the form submission
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBook(author, title, pages, read);
    document.getElementById('form').reset();
    document.getElementById('bookForm').classList.add('hidden');
});

// Toggle the book form
document.getElementById('newBookBtn').addEventListener('click', function() {
    const bookForm = document.getElementById('bookForm');
    bookForm.classList.toggle('hidden');
});

// Cancel button
document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('bookForm').classList.add('hidden');
});

// Event delegation for remove and toggle buttons
document.getElementById('bookList').addEventListener('click', function(event) {
    const index = event.target.dataset.index;

    if (event.target.classList.contains('removeBookBtn')) {
        library.splice(index, 1);
        displayBooks();
    }

    if (event.target.classList.contains('toggleReadBtn')) {
        library[index].toggleReadStatus();
        displayBooks();
    }
});

// Adding some initial books
addBook('George Orwell', '1984', 328, true);
addBook('J.K. Rowling', 'Harry Potter and the Philosopher\'s Stone', 223, false);
