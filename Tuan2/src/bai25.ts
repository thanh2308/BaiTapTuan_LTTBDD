function downloadFile(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Download completed");
        }, 3000);
    });
}

async function main(): Promise<void> {
    console.log("Downloading...");

    const result = await downloadFile();

    console.log(result);
}

main();