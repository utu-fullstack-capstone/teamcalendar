const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// User Model
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).send('Access denied');
  }
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:id', auth, async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).send('Access denied');
  }
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
  if (!req.user.admin) {
    return res.status(401).send('Access denied');
  }
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/user
// @desc    Registering user
// @Access  Public

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
    if (!req.user.admin) {
      return res.status(401).send('Access denied');
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { name, email, password, admin } = req.body;

    try {
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

      // Return jsonwebtoken

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
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
router.get('/', (req, res) => res.send('hello'));

module.exports = router;
