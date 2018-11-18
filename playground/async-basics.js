console.log('Starting App');

setTimeout(() => {
  console.log('Inside the Callback');
}, 2000);

setTimeout(() => {
  console.log('Second setTimeout Callback');
}, 0);

console.log('Finishing Up');
