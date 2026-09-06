function failTask(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

async function main(): Promise<void> {
    try {
        const result = await failTask();
        console.log(result);
    } catch (error) {
        console.log((error as Error).message);
    }
}

main();