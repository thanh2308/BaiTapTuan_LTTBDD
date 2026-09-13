class Product {
    public name: string;
    public price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
    productFilter() {
        if (this.price > 100) {
            console.log(`Sản phẩm ${this.name} có giá lớn hơn 100`);
        }
}
}
const products = [
    new Product("Product 1", 130),
    new Product("Product 2", 80),
    new Product("Product 3", 50),
    new Product("Product 4", 150)   
];

products.forEach(product => product.productFilter());