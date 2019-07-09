const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// User Model
const User = require('../../models/User');

// @Route   POST api/user
// @desc    Test Route
// @Access  Public

router.post(
  '/',
=======
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  auth,
>>>>>>> origin/dev
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
<<<<<<< HEAD
    check('email', 'Provide a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with at least 6 characters.'
    ).isLength({ min: 6 })
=======
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 })
>>>>>>> origin/dev
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
<<<<<<< HEAD
      return res.status(400).send({ errors: errors.array() });
=======
      return res.status(400).json({ errors: errors.array() });
>>>>>>> origin/dev
    }

    const { name, email, password } = req.body;

    try {
<<<<<<< HEAD
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists!' }] });
      }
      // Get users gravatar
=======
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
>>>>>>> origin/dev

      user = new User({
        name,
        email,
        password
      });
<<<<<<< HEAD
      // Encrypt password

      const salt = await bcrypt.genSalt(10);
=======

      const salt = await bcrypt.genSalt(10);

>>>>>>> origin/dev
      user.password = await bcrypt.hash(password, salt);

      await user.save();

<<<<<<< HEAD
      // Return jsonwebtoken

=======
>>>>>>> origin/dev
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
<<<<<<< HEAD
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
=======
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
>>>>>>> origin/dev
    }
  }
);

module.exports = router;
