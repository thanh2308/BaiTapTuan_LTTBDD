function helloAsync(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello Async");
        }, 2000);
    });
}

async function main(): Promise<void> {
    const result = await helloAsync();
    console.log(result);
}

main();