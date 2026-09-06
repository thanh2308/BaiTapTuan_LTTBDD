function task(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(name);
        }, time);
    });
}

async function main(): Promise<void> {
    const result1 = await task("Task 1", 1000);
    console.log(result1);

    const result2 = await task("Task 2", 2000);
    console.log(result2);

    const result3 = await task("Task 3", 1000);
    console.log(result3);
}

main();