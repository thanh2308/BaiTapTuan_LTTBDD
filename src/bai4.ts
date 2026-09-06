function getRandomNumber(): Promise<number> {
    return new Promise((resolve) => {
      const number = Math.random();
      resolve(number);
    });
  }
  
  getRandomNumber()
    .then((number) => {
      console.log("Random number:", number);
    })
    .catch((error) => {
      console.error("Error:", error);
    });