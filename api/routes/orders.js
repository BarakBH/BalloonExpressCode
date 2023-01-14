const express = require('express');
const router = express.Router();
const { authorize, authorizeAdmin } = require('../controllers/auth/authorize');
const Orders = require('../models/orders.model');
const Stats = require('../models/stats.model');

router.post('/orders', authorize, async (req, res) => {
  try {
    const { products, amount, paymentMethod, status, address } = req.body;

    if(!products || !amount || !paymentMethod || !address) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // revnue stats
    const stats = await Stats.findOne({ date: new Date().toISOString().slice(0, 10) });
    if(!stats) {
      const newStats = await Stats.create({
        date: new Date().toISOString().slice(0, 10),
        earning: amount
      });
    }
    else {
      const newStats = await Stats.findOneAndUpdate({ date: new Date().toISOString().slice(0, 10) }, {
        $set: {
          earning: stats.earning + amount
        }
      });
    }

    const order = await Orders.create({
      user: req.user._id,
      products,
      amount,
      paymentMethod,
      status: 'pending',
      address
    });

    res.status(201).json({
      message: "Order add successfully",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

router.get('/orders', authorizeAdmin, async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

router.put('/orders', authorizeAdmin, async (req, res) => {
  try {
    const { status, id } = req.query;
    if(!status || !id) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const order = await Orders.findByIdAndUpdate({_id: id}, { status }, { new: true });
    res.status(200).json({
      message: "Order updated successfully",
      order
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

router.get('/userOrders', authorize, async (req, res) => {
  try {
    const orders = await Orders.find({user:req.user._id});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

router.get('/stats', authorizeAdmin, async (req, res) => {
  try {
    const stats = await Stats.find().limit(30).sort({ date: -1 });
    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
})

module.exports = router;