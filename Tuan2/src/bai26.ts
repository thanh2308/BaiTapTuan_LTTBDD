function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main(): Promise<void> {
    console.log("Start");

    await wait(5000);

    console.log("5 seconds passed");
}

main();