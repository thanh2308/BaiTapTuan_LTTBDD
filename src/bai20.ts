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
        }, 3000);
    });
}

function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("API call timeout"));
        }, ms);
    });
}

async function fetchUserWithTimeout(id: number): Promise<User> {
    return Promise.race([
        fetchUser(id),
        timeout(2000)
    ]);
}

async function main(): Promise<void> {
    try {
        const user = await fetchUserWithTimeout(1);
        console.log(user);
    } catch (error) {
        console.log((error as Error).message);
    }
}

main();