const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('../controllers/auth/authorize');
const Products = require('../models/products.model');

// add new product
router.post('/products', authorizeAdmin, async (req, res) => {
  try {

    const { name, sku, quantity, sale, colors, published, price, desc, shortDesc, thumbnail, gallery, category, isSale } = req.body;
    console.log(colors)
    if(!name || !price || !thumbnail) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const slug = name.replace(/\s+/g, '-').toLowerCase();

    // check if slug is unique
    const slugExists = await Products.findOne({ slug });
    if(slugExists) {
      return res.status(400).json({
        message: "Product already exists"
      });
    }
    
    const product = await Products.create({
      name,
      slug,
      sku : sku || null,
      quantity : quantity || null,
      isSale : isSale || false,
      sale : sale || null,
      published : published || true,
      price,
      desc : desc || "",
      shortDesc : shortDesc || "",
      thumbnail,
      gallery : gallery || [],
      category : category || {},
      options: {
        colors: colors || [],
      }
    });

    res.status(201).json({
      message: "Product add successfully",
      product
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

module.exports = router;


//save existing product
router.put('/products', authorizeAdmin, async (req, res) => {
  try {

    const {_id, name, sku, colors, quantity, sale, published, price, desc, thumbnail, shortDesc, gallery, category, isSale } = req.body;

    if(!_id, !name || !price || !thumbnail) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    console.log(colors)
    
    const product = await Products.findOneAndUpdate({ _id: _id }, {
      name,
      sku : sku || null,
      quantity : quantity || null,
      isSale : isSale || false,
      sale : sale || null,
      published : published || true,
      price,
      desc : desc || "",
      shortDesc : shortDesc || "",
      thumbnail,
      gallery : gallery || [],
      category : category || {},
      options: {
        colors: colors || [],
      }
    });

    console.log(_id)

    res.status(201).json({
      message: "Product saved successfully",
      product
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

module.exports = router;

//get product by id or slug
router.get('/products/:key', async (req, res) => {
  try {

    const { key } = req.params;

    if(!key) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const productBySlug = await Products.findOne({ slug: key });
    if(productBySlug) {
      return res.status(200).json(productBySlug);
    }

    const productById = await Products.findOne({ _id: key });
    if(productById) {
      return res.status(200).json(productById);
    }

    return res.status(404).json({
      message: "Product not found"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

//get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Products.find();

    return res.status(200).json(products);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

//delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const product = await Products.findOneAndDelete({ _id: id });
    if(product) {
      return res.status(200).json({
        message: "Product deleted successfully"
      });
    }

    return res.status(404).json({
      message: "Product not found"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

//set product as featured
router.put('/products/featured', authorizeAdmin, async (req, res) => {
  try {
    const { id, featured } = req.body;
    console.log(id, featured)

    if(!id) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }
    
    //update featured
    const updatedProduct = await Products.findOneAndUpdate({ _id: id }, { isFeatured: featured || false });
    if(updatedProduct) {
      return res.status(200).json({
        message: "Featured update successfully"
      });
    }

    return res.status(404).json({
      message: "Product not found"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
});

router.get('/product/:key', async (req, res) => {
  try {
    const { key } = req.params;

    if(!key) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const product = await Products.findOne({ slug: key });
    if(product) {
      return res.status(200).json(product);
    }

    return res.status(404).json({
      message: "Product not found"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({  message: 'Internal Server Error', error });
  }
})


module.exports = router;