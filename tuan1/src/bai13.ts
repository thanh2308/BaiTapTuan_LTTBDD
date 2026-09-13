abstract class Shape {
    abstract area(): number;
}
class Square  extends Shape {
    constructor(public width: number, public height: number) {
        super();
    }
    area(): number {
        return this.width * this.height;
    }
}
class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }
    area(): number {
        return Math.PI * this.radius ** 2;
    }
}
const square = new Square(5, 10);
const circle = new Circle(7);
console.log(`Diện tích hình chữ nhật: ${square.area()}`);
console.log(`Diện tích hình tròn: ${circle.area().toFixed(2)}`);