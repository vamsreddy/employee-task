const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, username, password: hashedPassword });
    await admin.save();
    res.status(201).json({
      status: 'success',
      message: 'Admin registered successfully',
      data: {
        data: admin,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error registering admin',
      data: {
        data: error,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send('Admin not found');
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET);
    res.status(200).json({
      status: 'success',
      message: 'Admin logged in successfully',
      data: {
        token: token, // Here you provide the generated JWT token
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error logging in',
      data: {
        error: error, // Here you provide the error data
      },
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error logging out',
      data: {
        error: error,
      },
    });
  }
};

exports.protect = (req, res, next) => {
  // Get the token from the request headers
  const tokenHeader = req.headers.authorization;
  let token;
  if (tokenHeader) {
    token = tokenHeader.split(' ')[1]; // Extract token part after 'Bearer'
    // console.log(token); // This will log the token value without 'Bearer'
  } else {
    console.error('Authorization header is missing');
  }

  // Check if token is provided
  if (!token) {
    return res
      .status(401)
      .json({ status: 'failed', message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object for later use
    req.user = decoded;
    // Call the next middleware
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: 'failed', message: 'Invalid token.' });
  }
};
