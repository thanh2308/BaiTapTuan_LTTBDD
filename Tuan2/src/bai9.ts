function getEvenNumbers(numbers: number[]): Promise<number[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evenNumbers = numbers.filter(
                (number) => number % 2 === 0
            );

            resolve(evenNumbers);
        }, 1000);
    });
}

getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8])
    .then((result) => {
        console.log(result);
    });