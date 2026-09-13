class User {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}

const user1 = new User("Thanh");

console.log(user1.name);

user1.name = "Hoài Thanh";

console.log(user1.name);