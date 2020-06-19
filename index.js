function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

let myLibrary;

if (!localStorage.getItem("books")) {
    const sample0 = new Book("The Autobiography of Malcolm X", "Malcolm X with Alex Haley", 528, false);
    const sample1 = new Book("Atomic Habits", "James Clear", 320, true);
    
    localStorage.setItem("books", JSON.stringify([sample0, sample1]));
    myLibrary = JSON.parse(localStorage.getItem("books"));
} else {
    myLibrary = JSON.parse(localStorage.getItem("books"));
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary = [...myLibrary, newBook];
    localStorage.setItem("books", JSON.stringify(myLibrary));
    render();
}

function render() {
    console.log("rendering...");
    const body = document.querySelector("tbody");
    while (body.firstChild) {
        body.removeChild(body.lastChild);
    }

    myLibrary.forEach((val, index) => {
        let row = document.createElement("tr");
        row.setAttribute("data-index", index);
        
        let cellRead = document.createElement("td");
        let readCheckbox = document.createElement("input");
        readCheckbox.setAttribute("type", "checkbox");
        readCheckbox.setAttribute("name", "read");
        readCheckbox.setAttribute("id", "read-btn");
        readCheckbox.checked = val.read;
        readCheckbox.onclick = (e) => {
            const parentRow = e.target.parentNode.parentNode;
            const i = parentRow.dataset.index;
            changeBookStatus(i);
        }
        cellRead.appendChild(readCheckbox);
        row.appendChild(cellRead);

        let cellTitle = document.createElement("th");
        cellTitle.textContent = val.title;
        cellTitle.setAttribute("scope", "row");
        row.appendChild(cellTitle);

        let cellAuthor = document.createElement("td");
        cellAuthor.textContent = val.author;
        row.appendChild(cellAuthor);

        let cellPages = document.createElement("td");
        cellPages.textContent = val.pages;
        row.appendChild(cellPages);

        let cellRemove = document.createElement("td");
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "🗑️";
        removeBtn.setAttribute("class", "delete-btn");
        removeBtn.onclick = (e) => {
            const parentRow = e.target.parentNode.parentNode;
            const i = parentRow.dataset.index;
            console.log(i);
            removeBook(i);
        }
        cellRemove.appendChild(removeBtn)
        row.appendChild(cellRemove);

        body.appendChild(row);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(myLibrary));    
    render();
}

function changeBookStatus(index) {
    localStorage.setItem("books", JSON.stringify(myLibrary[index].read = !(myLibrary[index].read)));    
    render();
}

const newBookBtn = document.querySelector("#new-book-btn");
const newBookTitle = document.querySelector("#title");
const newBookAuthor = document.querySelector("#author");
const newBookPages = document.querySelector("#pages");
const newBookRead = document.querySelector("#read-form");

newBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!(newBookTitle.value && newBookAuthor.value && newBookPages.value)) {
        return;
    }
    const title = newBookTitle.value;
    const author = newBookAuthor.value;
    const pages = newBookPages.value;
    const read = newBookRead.checked;

    addBookToLibrary(title, author, pages, read);
})

render();