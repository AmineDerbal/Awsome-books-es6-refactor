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

const getDaySuffix = (day) => {
  if (day === 1 || day === 21 || day === 31) {
    return 'st';
  } if (day === 2 || day === 22) {
    return 'nd';
  } if (day === 3 || day === 23) {
    return 'rd';
  }
  return 'th';
};

const getDatePeriod = (hours) => {
  if (hours < 12) {
    return 'am';
  }
  return 'pm';
};

const getTime = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const month = months[new Date().getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  time.innerHTML = `${month} ${day}${getDaySuffix(day)} ${year}, ${hours}:${minutes}:${seconds} ${getDatePeriod(hours)}`;
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