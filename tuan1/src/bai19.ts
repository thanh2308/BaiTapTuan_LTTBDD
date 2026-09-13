class Animal {
    sound(): void {
        console.log("Animal sound");
    }
}

class Dog extends Animal {
    override sound(): void {
        console.log("Gâu gâu");
    }
}

class Cat extends Animal {
    override sound(): void {
        console.log("Meo meo");
    }
}

const animals: Animal[] = [
    new Dog(),
    new Cat()
];

animals.forEach(animal => animal.sound());