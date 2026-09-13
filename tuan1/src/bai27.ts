class Person {
    constructor(
        public name: string,
        public age: number
    ) {}
}

class Teacher extends Person {
    constructor(
        name: string,
        age: number,
        public subject: string
    ) {
        super(name, age);
    }

    introduce(): void {
        console.log(
            `Tôi là ${this.name}, ${this.age} tuổi, dạy môn ${this.subject}.`
        );
    }
}

const teacher = new Teacher("Thanh", 25, "Lập trình");

teacher.introduce();