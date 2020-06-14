let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
        const read = this.read ? "has been read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
    }
}

function addBookToLibrary() {
    
}