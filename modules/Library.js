const books = document.querySelector('.books');

export default class Library {
  constructor(library = new Array([])) {
    this.library = library;
  }

  displayBooks() {
    books.innerHTML = '';
    for (let i = 0; i < this.library.length; i += 1) {
      books.appendChild(Library.addBookHtmlElement(this.library[i], i));
    }
    const removeButtons = document.querySelectorAll('.book-remove');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.bookIndex;
        this.removeBook(this.library[index]);
        this.displayBooks();
      });
    });
  }

  static addBookHtmlElement(book, bookNumber) {
    book.index = bookNumber;
    const bookHtml = document.createElement('div');
    bookHtml.className = 'book';
    if (bookNumber % 2 === 0) {
      bookHtml.classList.add('gray-background');
    }
    bookHtml.innerHTML = `<p class = "book-title"> ${book.title} By ${book.author} </p>
   <button class="book-remove" data-book-index=${bookNumber}> remove</button>  `;
    return bookHtml;
  }

  removeBook(book) {
    this.library.splice(book.index, 1);
    localStorage.setItem('booksData', JSON.stringify(this.library));
  }

  addBook(book) {
    this.library.push(book);
    localStorage.setItem('booksData', JSON.stringify(this.library));
  }
}