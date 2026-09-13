class Book {
    constructor(public title: string, public author: string, public year: number) {}
    displayInfo() {
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`Year: ${this.year}`);
    }
}
const book = new Book("Lao Hat", "Nam Cao", 1947);
book.displayInfo();