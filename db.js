// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
  
// // Set Up the Database connection
// mongoose.connect('mongodb://localhost:27017/geeksforgeeks', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then((result) => {
//     console.log('Connection Established')
// }).catch((err) => {
//     console.log(err)
// });
  
// // Defining User schema
// const userSchema = new Schema(
//     { name: String, age: Number, email: String }
// )
  
// // Defining User model
// const User = mongoose.model('User', userSchema);
  
// // Create collection of Model
// User.createCollection().then(function (collection) {
//     console.log('Collection is created!');
// });