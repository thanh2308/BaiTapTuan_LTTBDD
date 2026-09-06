function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Task ${time}ms done`), time);
    });
  }
  
  Promise.all([
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500)
  ]).then((results) => {
    console.log(results);
  });