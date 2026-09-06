function multiplyByThree(number: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(number * 3);
        }, 1000);
    });
}

async function main(): Promise<void> {
    const result = await multiplyByThree(5);
    console.log(result);
}

main();