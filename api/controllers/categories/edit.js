const Categories = require('../../models/categories.model');

const editCategories = async (req, res) => {

  try {
    
    const { name, thumbnail } = req.body;
    const { id } = req.params;

    // check exist category
    const checkCategory = await Categories.findOne({ _id:id });
    if (!checkCategory) {
      return res.status(400).json({
        message: 'Category not found',
      });
    }

    // update category
    const updateCategory = await Categories.findOneAndUpdate({ _id:id }, {
      name,
      thumbnail,
    });

    // send response
    res.status(200).json({
      message: 'Category update successfully'
    });


  } catch (error) {
    res.status(500).json({message: "Something wrong",error});
  }

}

module.exports = editCategories;