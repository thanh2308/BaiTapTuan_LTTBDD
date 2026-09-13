interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Thanh toán tiền mặt: ${amount}`);
    }
}

class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Thanh toán bằng thẻ: ${amount}`);
    }
}

const cash = new CashPayment();
const card = new CardPayment();

cash.pay(500);
card.pay(1000);