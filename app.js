const btn = document.querySelector('.btn');

const getSelectedValue = (radio) => {
    let selectedValue;
    for (const  item of radio){
        if (item.checked) {
            selectedValue = item;
            break;
        }
    }
    return selectedValue;
}

const createRow = (title, author, priority, category) => {
    const row = document.createElement('tr');
    document.querySelector('.tab__body').appendChild(row);
    const titleCell = document.createElement('td');
    titleCell.innerText = title;
    row.appendChild(titleCell);
    titleCell.classList.add('tab__body_d')
    const authorCell = document.createElement('td');
    authorCell.innerText = author;
    row.appendChild(authorCell);
    authorCell.classList.add('tab__body_d')
    const priorityCell = document.createElement('td');
    priorityCell.innerText = priority;
    row.appendChild(priorityCell);
    priorityCell.classList.add('tab__body_d');
    const categoryCell = document.createElement('td');
    categoryCell.innerText = category;
    row.appendChild(categoryCell);
    categoryCell.classList.add('tab__body_d');
}

const validation = (title, author, priority, category) => {
    let message = '';
    if (title.length < 1){
         message = message + '\n Tytuł musi zawierać co najmniej 1 znak.';
    }
    if (author.length < 3){
        message = message + '\n Autor musi zawierać co najmniej 3 znak.';
    }
    if (!priority) {
        message = message + '\n Wybierz priorytet przeczytania.';
    }
    if (!category) {
        message = message + '\n Wybierz kategorię.';
    }
    return message;
}

const saveBookToLocalStorage = (book) => {
    let dataFromLocalStorage = [];
    if (localStorage.getItem('books') != null){
        dataFromLocalStorage = JSON.parse(localStorage.getItem('books'));
        dataFromLocalStorage.push(book);
        localStorage.setItem("books", JSON.stringify(dataFromLocalStorage));
    } else {
        dataFromLocalStorage.push(book);
        localStorage.setItem("books",JSON.stringify(dataFromLocalStorage));
    }
}

(() => {
    const books = JSON.parse(localStorage.getItem("books"));
    if (books) {
        books.forEach((book) => {
            createRow(book.title, book.author, book.priority, book.category);
        })
    }
})();


const addToTable = event => {
    event.preventDefault();
    const title = document.querySelector('.title');
    const author = document.querySelector('.author');
    const priorities = document.querySelectorAll('.priority');
    const categories = document.querySelectorAll('.category');
    const priority = getSelectedValue(priorities);
    const category = getSelectedValue(categories);
    const result = validation(title.value, author.value, priority, category);

    const message = document.querySelector('main div');
    if (message.classList.contains('error')) {
        message.classList.remove('error');
        message.innerText = '';
    }

    if (!result) {
        createRow(title.value, author.value, priority.value, category.value);
        saveBookToLocalStorage({
            title: title.value,
            author: author.value,
            priority: priority.value,
            category: category.value,
        })
        title.value = "";
        author.value = "";
        priority.checked = false;
        category.checked = false;

    } else {
        const message = document.querySelector('main div');
        message.className = 'error';
        message.innerText = result;
    }

}

btn.addEventListener('click', addToTable)

