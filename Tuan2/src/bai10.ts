function doTask(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task completed");
        }, 1000);
    });
}

doTask()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error.message);
    })
    .finally(() => {
        console.log("Done");
    });