const express = require('express');
const cors = require('cors');
const dbinit = require('./config/db.config');
const app = express();
const path = require('path');

var allowlist = ['http://localhost:3000/', 'http://localhost:3001/']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(allowlist))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use( '/images', express.static(__dirname + '/uploads'));
require('dotenv').config();

// connect to mongodb
dbinit();

//initialize routes
const authRouter = require('./routes/auth');
const categoriesRouter = require('./routes/categories');
const uploadImage = require('./routes/imageupload');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use('/api', authRouter);
app.use('/api', categoriesRouter);
app.use('/api', uploadImage);
app.use('/api', productsRouter);
app.use('/api', ordersRouter);
app.get('/', function(req,res){
    res.send('working')
})


//error handler 
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({error:err.stack});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})