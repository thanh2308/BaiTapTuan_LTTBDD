interface Vehicle {
    brand: string;
    move(): void;
}

class Car implements Vehicle {
    constructor(public brand: string) {}

    move(): void {
        console.log(`${this.brand} chạy bằng ô tô`);
    }
}

class Bike implements Vehicle {
    constructor(public brand: string) {}

    move(): void {
        console.log(`${this.brand} chạy bằng xe máy`);
    }
}

const car = new Car("Toyota");
const bike = new Bike("Honda");

car.move();
bike.move();