class BankAccount {
    constructor(public balance: number) {}
    desposit(amount: number): void {
        this.balance += amount;
        console.log(`Nạp tiền thành công: ${amount}`);
    }
    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log("Số dư không đủ để rút tiền: " + amount);
        } else {
            this.balance -= amount;
            console.log(`Rút tiền thành công: ${amount}`);
        }
    }
}
const account = new BankAccount(1000);
account.desposit(500);
console.log(`Số dư hiện tại: ${account.balance}`);
account.withdraw(2000);
console.log(`Số dư hiện tại: ${account.balance}`);