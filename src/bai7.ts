function task(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`${name} finished first candidate`), time);
    });
  }
  
  Promise.race([
    task("Task A", 2000),
    task("Task B", 1000),
    task("Task C", 1500)
  ]).then((result) => console.log(result));