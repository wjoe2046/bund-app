const Category = require('../models/categoryModels');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ data });
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'category not found',
      });
    } else {
      req.category = category;
      next();
    }
  });
};

exports.readCategory = (req, res) => {
  return res.status(200).json(req.category);
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Category has been deleted',
    });
  });
};

exports.listCategory = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      data,
    });
  });
};

// listCategory,
// deleteCategory,
// updateCategory,
