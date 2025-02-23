const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // This is where the problem lies. If there is an error during the asynchronous
  // operation, it's not handled correctly.  The error is silently swallowed.
  someAsyncOperation().then(() => {
    res.send('Hello World!');
  });
});

function someAsyncOperation() {
  return new Promise((resolve, reject) => {
    // Simulate an error
    setTimeout(() => {
      reject(new Error('Something went wrong'));
    }, 100);
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});