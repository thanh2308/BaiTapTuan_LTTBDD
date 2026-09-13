class Account {
    public accountNumber: string;
    private _password: string;
    readonly capcha: string;
    constructor(accountNumber: string, password: string, capcha: string) {
        this.accountNumber = accountNumber;
        this._password = password;
        this.capcha = capcha;
    }
    checkPassword(inputPassword: string): boolean {
        return this._password === inputPassword;
    }
}
const account1 = new Account("123456789", "password123", "abc123");
console.log("Account Number: " + account1.accountNumber);
console.log("Capcha: " + account1.capcha);
console.log("Password: " + account1.checkPassword("password123"));