async function main(): Promise<void> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
    );

    const data = await response.json();

    console.log(data);
}

main();