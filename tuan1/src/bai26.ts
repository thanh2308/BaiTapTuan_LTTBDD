class Product {
    constructor(
        public name: string,
        public price: number
    ) {}
}

class Order {
    products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    totalPrice(): number {
        return this.products.reduce((sum, p) => sum + p.price, 0);
    }
}

const order = new Order();

order.addProduct(new Product("Chuột", 150));
order.addProduct(new Product("Bàn phím", 300));

console.log(`Tổng giá trị đơn hàng: ${order.totalPrice()}`);