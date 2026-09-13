class Box<T> {
    constructor(public value: T) {}

    getValue(): T {
        return this.value;
    }
}

const box1 = new Box<number>(100);
const box2 = new Box<string>("Hello");

console.log(box1.getValue());
console.log(box2.getValue());