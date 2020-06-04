const { promisify } = require('util');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

dotenv.config({ path: './config.env' });

const signToken = (id) => {
  // {id:id} is same as {id}
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // with this all the users can be added as admin, as we are using whole body to create
  // const newUser = await User.create(req.body);
  // with this, we only allow the data we need to create a user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  console.log(process.env.JWT_SECRET);
  // Sign to generate a token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // same as email = req.body.email
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // check if user exits && password is correct
  // in Es6 {email: email} can be abbreviated as {email}
  // + as password selection os by default false in userModel
  const user = await User.findOne({ email }).select('+password');
  // const correct = await user.correctPassword(password, user.password);

  //if (!user || !correct) {
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // If everything, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

// To check whether user logged in or not  -- middleware
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Get the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2. Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3. Check if user still exists

  // 4. Check if user changed password after the token was issued.

  next();
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDkyYWI4MzQ1Y2E5NmNlMTk5ZjUwMiJ9.VV6uk896Fv-z9s2Xgi87cwSEHZsuIvY-MejejwB_8ak
