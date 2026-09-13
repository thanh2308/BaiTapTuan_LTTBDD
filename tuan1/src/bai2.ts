class Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    displayInfo() {
        console.log(`${this.name} - ${this.age}`);
    }
}

class Student extends Person {
    constructor(
        name: string,
        age: number,
        public grade: string
    ) {
        super(name, age);
    }

    displayAll() {
        console.log(`Tên: ${this.name}`);
        console.log(`Tuổi: ${this.age}`);
        console.log(`Lớp: ${this.grade}`);
    }
}

const s = new Student("Thanh", 20, "CNTT 01");
s.displayAll();