console.log("Program Started");

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

console.log(promise1);
console.log("Program in progress");

promise1
  .then(() => {
    console.log("Step 1 Complete");

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  })
  .then(() => {
    console.log("Step 2 Complete");
  })
  .catch(() => {
    console.log("Program failure");
  });
