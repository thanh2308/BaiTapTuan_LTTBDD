interface User {
    id: number;
    name: string;
}

function fetchUser(id: number): Promise<User> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `User ${id}`
            });
        }, 1000);
    });
}

async function main(): Promise<void> {
    const user = await fetchUser(1);

    console.log(user);
}

main();