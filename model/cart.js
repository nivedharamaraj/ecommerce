const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: {
    type:String,
    ref: "User",
    required: false,
  },
  items: [
    {
      productId: {
        type:String,
        ref:"Product",
      },
    
      title: {
        type:String,
      },
      image: {
        type:String,
    }, 
      qty: {
        type:Number,
       
      },
      price: {
        type:Number,
        default:0,
      },
      total: {
        type:Number,
        default:0,
      },
      
    },
  ],
  totalQty: {
    type:Number,
    default:0,
    required:true,
  },
  totalCost: {
    type:Number,
    default:0,
    required:true,
  },

  createdAt: {
    type:Date,
    default:Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);