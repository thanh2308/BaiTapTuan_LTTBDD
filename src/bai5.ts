function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Task done"), time);
    });
  }
  
  simulateTask(1500).then((result) => console.log(result));