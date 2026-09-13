class Book {
    constructor(
        public title: string,
            public author: string,
        public year: number
    ) {}
}

class User {
    constructor(public name: string) {}
}

class Library {
    books: Book[] = [];
    users: User[] = [];

    addBook(book: Book) {
        this.books.push(book);
    }

    addUser(user: User) {
        this.users.push(user);
    }

    displayBooks() {
        this.books.forEach(b => {
            console.log(`${b.title} - ${b.author} (${b.year})`);
        });
    }

    displayUsers() {
        this.users.forEach(u => {
            console.log(u.name);
        });
    }
}

const book1 = new Book("Lao Hat", "Nam Cao", 1943);
const book2 = new Book("Java", "James", 1995);
const lib = new Library();

lib.addBook(book1);
lib.addBook(book2);
lib.addUser(new User("Thanh"));

lib.displayBooks();
lib.displayUsers();