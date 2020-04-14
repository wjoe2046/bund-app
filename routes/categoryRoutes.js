const express = require('express');
const router = express.Router();

const {
  createCategory,
  categoryById,
  readCategory,
  listCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoryControllers.js');
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/userAuthControllers');
const { userById } = require('../controllers/userControllers.js');

router.get('/category/:categoryId', readCategory);
router.post(
  '/category/create/:userId',
  requireSignin,
  // isAuth,
  // isAdmin,
  createCategory
);
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  // isAuth,
  // isAdmin,
  updateCategory
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  // isAuth,
  // isAdmin,
  deleteCategory
);
router.get('/categories', listCategory);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
