const Categories = require('../../models/categories.model');

const addCategories = async (req, res) => {

  try {
    
    const { name, slug, thumbnail } = req.body;

    //validate user data
    if (!name || !slug || !thumbnail) {
      return res.status(400).json({
        message: 'נא מלאו את כל השדות',
      });
    }

    // check if category exist
    const checkCategory = await Categories.findOne({ slug });
    if (checkCategory) {
      return res.status(400).json({
        message: 'קטגוריה כבר קיימת',
      });
    }

    // create new category
    const newCategory = new Categories({
      name,
      slug,
      thumbnail,
      products: 0,
    });

    // save category
    const saveCategory = await newCategory.save();

    // send response
    res.status(200).json({
      message: 'קטגוריה נוספה בהצלחה',
      category: saveCategory,
    });

  } catch (error) {
    res.status(500).json({message: "משהו השתבש",error});
  }

}

module.exports = addCategories;