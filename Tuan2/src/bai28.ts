function processTask(id: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} completed`);
        }, 1000);
    });
}

async function batchProcess(): Promise<void> {
    const results = await Promise.all([
        processTask(1),
        processTask(2),
        processTask(3),
        processTask(4),
        processTask(5)
    ]);

    console.log(results);
}

batchProcess();