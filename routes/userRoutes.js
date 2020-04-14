const express = require('express');
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/userAuthControllers');

const {
  userById,
  readUser,
  updateUser,
} = require('../controllers/userControllers.js');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get('/user/:userId', requireSignin, readUser);
router.put('/user/:userId', requireSignin, updateUser);

router.param('userId', userById);

module.exports = router;
