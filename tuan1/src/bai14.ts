class Employee {
    constructor(public name: string) {}

    work() {
        console.log(`${this.name} đang làm việc`);
    }
}

class Manager extends Employee {
    manage() {
        console.log(`${this.name} đang quản lý nhân viên`);
    }
}

class Developer extends Employee {
    code() {
        console.log(`${this.name} đang lập trình`);
    }
}

const m = new Manager("Nguyen Van A");
m.work();
m.manage();

const d = new Developer("Thanh");
d.work();
d.code();