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

async function fetchUsers(ids: number[]): Promise<User[]> {
    const users = await Promise.all(
        ids.map((id) => fetchUser(id))
    );

    return users;
}

async function main(): Promise<void> {
    const users = await fetchUsers([1, 2, 3]);

    console.log(users);
}

main();