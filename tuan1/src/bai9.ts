interface Animal {
    name: string;
    Sound(): void;
}
class Dog implements Animal {
    constructor(public name: string) {}
    Sound(): void {
        console.log("Sound " + this.name + " :GauGau");
    }
}
const dog = new Dog("Lucky");
dog.Sound();