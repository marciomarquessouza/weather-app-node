// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//       resolve("It's worked");
//       // reject("The promisse wasn't fullfil")
//   }, 3000);
// });
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });

const asyncAdd = (a,b)=> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject("The values must be numbers")
      }
    }, 3000);
  });
}

asyncAdd(10, 30).then((res) => {
  console.log('resolve', res);
}, (errorMessage) => { 
  console.log('error: ', errorMessage);
});
