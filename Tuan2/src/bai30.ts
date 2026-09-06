interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodo(id: number): Promise<Todo> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

async function main(): Promise<void> {
    const results = await Promise.allSettled([
        fetchTodo(1),
        fetchTodo(2),
        fetchTodo(999999)
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(
                `Request ${index + 1}: SUCCESS`
            );

            console.log(result.value);
        } else {
            console.log(
                `Request ${index + 1}: FAILED`
            );

            console.log(result.reason.message);
        }
    });
}

main();