const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectID;

module.exports = mongoose.connect('mongodb://127.0.0.1:27017/New-Ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ObjectID
}).then((result) => {
    console.log('Connection Established')
}).catch((err) => {
    console.log(err.message)
});

