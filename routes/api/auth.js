const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const bycrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public - no authentificaion!
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ Route  Post api/auth
// @ desc   Authenticate user & get token
// @ access Public
=======
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');

// POST api/auth
// login route
>>>>>>> origin/dev

router.post(
  '/',
  [
<<<<<<< HEAD
    check('email', 'Provide a valid email').isEmail(),
    check('password', 'Password required.').exists()
=======
    check('email', 'Email must be valid').isEmail(),
    check('password', 'Password is required').exists()
>>>>>>> origin/dev
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
<<<<<<< HEAD
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Input!' }] });
      }

      // compare passward

      const isMatch = await bycrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Input!' }] });
      }

      // Return jsonwebtoken

=======
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid password or email' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid password or email' }] });
      }

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
