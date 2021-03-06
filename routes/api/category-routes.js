const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const findAllCategory = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(findAllCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findOneCategory = await Category.findOne({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!findOneCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }


    res.status(200).json(findOneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const createNewCategory = await Category.create(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(createNewCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCatbyId = await Category.create(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updateCatbyId) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }


    res.status(200).json(updateCatbyId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCatbyID = await Category.create(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!deleteCatbyID) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }


    res.status(200).json(deleteCatbyID);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
