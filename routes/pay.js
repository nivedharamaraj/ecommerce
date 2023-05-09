const router= require("express").Router();
const paypal = require('paypal-rest-sdk');
var Checkout = require('../model/checkout');



router.get('/', (req, res) =>{
  res.render("pay")
}) 
   
router.post('/', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:4000/pay/s",
          "cancel_url": "http://localhost:4000/pay/c"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": req.body.Shoes,
                  "sku": "001",
                  "price": req.body.Buy,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total":  req.body.Buy
          },
          "description": "Hat for the best team ever"
      }]
  };
  router.get('/s', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    console.log('<<<<<',payerId,paymentId);
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total":  req.body.Buy
          }
      }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      console.log('<<<');
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      });
      });

  router.get('/c', (req, res) => res.send('Cancelled'));

module.exports = router;