const mongoose = require("mongoose");

module.exports = mongoose.connect('mongodb://127.0.0.1:27017/New-Ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log('Connection Established')
}).catch((err) => {
    console.log(err.message)
});

