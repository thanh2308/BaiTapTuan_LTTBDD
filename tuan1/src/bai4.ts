class Rectangle {
    constructor(public width: number, public height: number) {}
    area(): number {
        return this.width * this.height;
    }

}
const rectangle = new Rectangle(5, 10);
const area = rectangle.area();
console.log(`Diện tích hình chữ nhật: ${area}`);