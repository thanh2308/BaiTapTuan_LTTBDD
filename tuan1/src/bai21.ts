class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}

const repo = new Repository<string>();
repo.add("Java");
repo.add("TypeScript");

console.log(repo.getAll());