let getUser = (id, callback) => {
  var user = {
    id,
    name: "Vikram",
  };
  callback(user);
};

getUser(31, (user) => {
  console.log(user);
});
