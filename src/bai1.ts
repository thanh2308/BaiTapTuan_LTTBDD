const promise1 = new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});

promise1.then((result) => {
    console.log(result);
});