interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
    );

    return response.json();
}

async function main(): Promise<void> {
    const todos = await fetchTodos();

    const completedTodos = todos.filter(
        (todo) => todo.completed
    );

    console.log(completedTodos);
}

main();