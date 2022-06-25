const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const findAllTags = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(findAllTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id',async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const findOneTag = await Tag.findOne({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });

    if (!findOneTag) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }


    res.status(200).json(findOneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const createNewTag = await Tag.create(req.body, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(createNewTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagbyId = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updateTagbyId) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }


    res.status(200).json(updateTagbyId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagbyID = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!deleteTagbyID) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }


    res.status(200).json(deleteTagbyID);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
