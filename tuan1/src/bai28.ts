class Animal {
    protected makeSound(): void {
        console.log("Âm thanh động vật");
    }

    speak(): void {
        this.makeSound();
    }
}

class Dog extends Animal {
    protected override makeSound(): void {
        console.log("Gâu gâu");
    }
}

class Cat extends Animal {
    protected override makeSound(): void {
        console.log("Meo meo");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.speak();
cat.speak();