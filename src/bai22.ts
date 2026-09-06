async function fetchTodo(id: number): Promise<unknown> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    return response.json();
}

async function main(): Promise<void> {
    const results = await Promise.all([
        fetchTodo(1),
        fetchTodo(2),
        fetchTodo(3)
    ]);

    console.log(results);
}

main();