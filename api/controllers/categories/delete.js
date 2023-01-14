const Categories = require('../../models/categories.model');

const deleteCategories = async (req, res) => {

  try {
    
    const { id } = req.params;

    // check exist category
    const checkCategory = await Categories.findOne({ _id:id });
    if (!checkCategory) {
      return res.status(400).json({
        message: 'Category not found',
      });
    }

    // delete category
    const deleteCategory = await Categories.findOneAndDelete({ _id:id });

    // send response
    res.status(200).json({
      message: 'Category deleted',
      category: deleteCategory,
    });


  } catch (error) {
    res.status(500).json({message: "Something wrong",error});
  }

}

module.exports = deleteCategories;