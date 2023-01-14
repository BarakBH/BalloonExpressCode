const Categories = require('../../models/categories.model');

const getCategories = async (req, res) => {

  try {
    
    // get categories
    const categories = await Categories.find();

    // send response
    res.status(200).json(categories);


  } catch (error) {
    res.status(500).json({message: "Something wrong",error});
  }

}

module.exports = getCategories;