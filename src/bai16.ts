function task(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(name);
        }, time);
    });
}

async function main(): Promise<void> {
    const results = await Promise.all([
        task("Task 1", 1000),
        task("Task 2", 2000),
        task("Task 3", 1500)
    ]);

    console.log(results);
}

main();