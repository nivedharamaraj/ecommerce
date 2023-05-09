const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({

 id: {
    type:String,
    
  },
  title: {
    type:String,
    required: true,
  },
  slug:{
    type:String,
    
},
  image: {
    type:String,
    required: true,
  },
  description: {
    type:String,
    
  },
  price: {
    type:Number,
    required: true,
  },
  category: {
    type:String,
   
  },
 
  qty: {
    type:Number,
   
  },
  createdAt: {
    type:Date,
    default:Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
