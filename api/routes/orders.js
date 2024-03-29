const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const { authorize, authorizeAdmin } = require('../controllers/auth/authorize');
const Orders = require('../models/orders.model');
const Stats = require('../models/stats.model');

router.get('/orders/checkout:orderId', authorize, async (req, res) => {
  try {
    const { products } = req.body;

    stripe.checkout.sessions.create({
      payment_method: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/`,
      cancel_url: `${req.protocol}://${req.get('host')}/`,
      customer_email: req.user.email,
      client_reference_id: req.params.orderId,
      line_items: [
        {
          name: `${products.name} product`,
          description: `${products.summary}`,
          images: [''],
          amount: products.price * 100,
          currency: 'usd',
          quantity: products.quantity
        }
      ]
    });

    res.status(200).json({
      status: 'success',
      session
    })

  } catch (error) {
    console.log('Err on checkout with Stripe', error);
    res.status(500).json({ message: 'שגיאה בשרת', error });
  }
})

router.post('/orders', authorize, async (req, res) => {
  try {
    const { products, amount, paymentMethod, status, address } = req.body;

    if (!products || !amount || !paymentMethod || !address) {
      return res.status(400).json({
        message: "חסרים שדות חובה"
      });
    }

    // revnue stats
    const stats = await Stats.findOne({ date: new Date().toISOString().slice(0, 10) });
    if (!stats) {
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
      message: "הזמנה נקלטה בהצלחה",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/orders', authorizeAdmin, async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.put('/orders', authorizeAdmin, async (req, res) => {
  try {
    const { status, id } = req.query;
    if (!status || !id) {
      return res.status(400).json({
        message: "חסרים שדות חובה"
      });
    }

    const order = await Orders.findByIdAndUpdate({ _id: id }, { status }, { new: true });
    res.status(200).json({
      message: "עדכון הזמנה בוצע בהצלחה",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/userOrders', authorize, async (req, res) => {
  try {
    const orders = await Orders.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/stats', authorizeAdmin, async (req, res) => {
  try {
    const stats = await Stats.find().limit(30).sort({ date: -1 });
    res.status(200).json(stats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
})

module.exports = router;