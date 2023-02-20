import { DateTime } from './modules/luxon.js';
import Book from './modules/Book.js';
import Library from './modules/Library.js';

const addBookButton = document.getElementById('submit');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');
const list = document.getElementById('list');
const addForm = document.getElementById('add-form');
const contact = document.getElementById('contact');
const time = document.querySelector('.time');

const getTime = () => {
  const date = DateTime.now();
  time.textContent = date.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);
};

setInterval(getTime, 1000);

const createLibrary = () => {
  let library;
  if (localStorage.getItem('booksData')) {
    library = new Library(JSON.parse(localStorage.getItem('booksData')));
    library.displayBooks();
    return library;
  }
  library = new Library();
  return library;
};

const library = createLibrary();

addBookButton.addEventListener('click', () => {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    const book = new Book(bookTitle.value, bookAuthor.value);
    library.addBook(book);
    library.displayBooks();
    bookTitle.value = '';
    bookAuthor.value = '';
  }
});

listLink.addEventListener('click', () => {
  list.classList.remove('hide');
  addForm.classList.add('hide');
  contact.classList.add('hide');
  listLink.classList.add('active');
  addLink.classList.remove('active');
  contactLink.classList.remove('active');
});

addLink.addEventListener('click', () => {
  list.classList.add('hide');
  addForm.classList.remove('hide');
  contact.classList.add('hide');
  listLink.classList.remove('active');
  addLink.classList.add('active');
  contactLink.classList.remove('active');
});

contactLink.addEventListener('click', () => {
  list.classList.add('hide');
  addForm.classList.add('hide');
  contact.classList.remove('hide');
  listLink.classList.remove('active');
  addLink.classList.remove('active');
  contactLink.classList.add('active');
});