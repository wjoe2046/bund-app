const express = require('express');
const router = express.Router();

const {
  createProducts,
  productById,
  readProduct,
  removeProduct,
  updateProduct,
  listProducts,
  listRelatedProducts,
  listCategories,
  listBySearch,
  photoOfProduct,
} = require('../controllers/productControllers');

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/userAuthControllers');
const { userById } = require('../controllers/userControllers.js');

router.get('/product/:productId', readProduct);

router.post(
  '/product/create/:userId',
  requireSignin,
  // isAuth,
  // isAdmin,
  createProducts
);

router.delete('/product/:productId/:userId', requireSignin, removeProduct);

router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAdmin,
  updateProduct
);

router.get('/products', listProducts);
router.get('/products/related/:productId', listRelatedProducts);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photoOfProduct);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
