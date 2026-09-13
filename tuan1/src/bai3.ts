class Car {
    constructor(public brand: string, public model: string, public year: number) {}
    displayInfo() {
        console.log(`Brand: ${this.brand}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
    }
}
const car = new Car("Toyota", "I don't know", 2020);
    car.displayInfo();