async function postData(): Promise<void> {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Hello TypeScript",
                body: "Async/Await POST request",
                userId: 1
            })
        }
    );

    const data = await response.json();

    console.log(data);
}

postData();