class Animal{
    public name: string;
    constructor(name: string){
        this.name = name;
    }
}
class Dog extends Animal{
    constructor(name: string){
        super(name);
    }
    bark(): void{
        console.log("Gâu Gâu");
    }
}
class Cat extends Animal{
    constructor(name: string){
        super(name);
    }
    meow(): void{
        console.log("Meo Meo");
    }
}
const dog1 = new Dog("Lucky");
dog1.bark();
const cat1 = new Cat("Miu Miu");
cat1.meow();