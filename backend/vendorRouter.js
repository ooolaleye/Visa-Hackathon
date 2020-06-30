const express = require('express');
const mongoose = require('mongoose');
const Vendor = require('./models/vendorSchema.js');
const vendorRouter = express.Router();

vendorRouter.get('/', async (req, res) => {
    Vendor.find({ }, function (err, data) {
      if(err) throw err;
      res.json(data);
    });
});

vendorRouter.post('/signUp', async (req, res) => {
    const vendor = new Vendor({
      username: req.body.username,
      password: req.body.password,
      company: req.body.company,
      address: {
          street: req.body.address.street,
          city: req.body.address.city,
          state: req.body.address.state,
          zipcode: req.body.address.zipcode
      }
    });
    console.log(vendor);
    vendor.save(function (err) {
        if(err){
          console.log(err);
          res.send('Username is taken! Please choose different username.');
        }
        else{
          res.send(vendor);
        }
    })
    /*.then(data => {
        res.send(data);
    });*/
});

vendorRouter.get('/login', async (req, res) => {
    Vendor.findOne({username: req.body.username}, function (err, data) {
        if(!data){
          console.log('Username does not exist');
          res.status(404).send({error:'Username does not exist'});
        }
        else if(data.password != req.body.password){
          res.send(false);
        }
        else if(data.password == req.body.password){
          res.send(true);
        }
    });
});

module.exports = vendorRouter;
