const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');

// User Model
const User = require('../../models/User');

// @Route   GET api/user
// @desc    Get all users
// @Access  Admin
router.get('/', auth, async (req, res) => {
  try {
    // check admin rights
    const account = await User.findById(req.user.id).select('-password');
    if (account.admin) {
      const users = await User.find();
      res.json(users);
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   GET api/user/:id
// @desc    Get user by id
// @Access  Admin
router.get('/:id', auth, async (req, res) => {
  try {
    // check admin rights
    const account = await User.findById(req.user.id).select('-password');

    if (account.admin) {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
      res.json(user);
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @Route   DELETE api/user/:id
// @desc    Delete user by id
// @Access  Admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const account = await User.findById(req.user.id).select('-password');
    if (account.admin) {
      await User.findByIdAndRemove(req.params.id);
      res.json({ msg: 'User deleted' });
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/user
// @desc    Register new user account
// @Access  Admin
router.post(
  '/',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Provide a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with at least 6 characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { name, email, password, admin } = req.body;

    try {
      const account = await User.findById(req.user.id).select('-password');
      if (account.admin) {
        // See if user exists
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists!' }] });
        }

        user = new User({
          name,
          email,
          password,
          admin
        });

        // Encrypt password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('User saved');
      } else {
        return res.status(401).json({ msg: 'Access denied' });
      }
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   PUT api/user
// @desc    Update user account
// @Access  Admin
router.put(
  '/:id',
  auth,
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Provide a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with at least 6 characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const account = await User.findById(req.user.id).select('-password');
      if (account.admin) {
        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.json({ msg: 'User account updated' });
      } else {
        return res.status(401).json({ msg: 'Access denied' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
