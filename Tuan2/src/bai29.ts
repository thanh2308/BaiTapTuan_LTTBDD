function processTask(id: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} completed`);
        }, 1000);
    });
}

async function queueProcess(): Promise<void> {
    const queue = [1, 2, 3, 4, 5];

    for (const id of queue) {
        const result = await processTask(id);

        console.log(result);
    }
}

queueProcess();