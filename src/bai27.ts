async function fetchWithRetry(
    url: string,
    retries: number
): Promise<Response> {

    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP Error: ${response.status}`
                );
            }

            return response;

        } catch (error) {
            lastError = error;

            console.log(`Attempt ${attempt} failed`);

            if (attempt < retries) {
                console.log("Retrying...");
            }
        }
    }

    throw lastError;
}

async function main(): Promise<void> {
    try {
        const response = await fetchWithRetry(
            "https://jsonplaceholder.typicode.com/todos/1",
            3
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.log((error as Error).message);
    }
}

main();