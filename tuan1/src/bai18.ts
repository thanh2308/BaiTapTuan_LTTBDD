class MathUtil {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }

    static multiply(a: number, b: number): number {
        return a * b;
    }

    static divide(a: number, b: number): number {
        return a / b;
    }
}

console.log("Add: " + MathUtil.add(10, 5));
console.log("Subtract: " + MathUtil.subtract(10, 5));
console.log("Multiply: " + MathUtil.multiply(10, 5));
console.log("Divide: " + MathUtil.divide(10, 5));