import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import filterObject from '../utils/filterObject.js';

export const getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

export const updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObject(
    req.body,
    'firstName',
    'lastName',
    'email',
    'phoneNumber'
  );

  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 200,
    message: 'update me',
    data: {
      user,
    },
  });
});

// ************CRUD***************
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Create user',
    data: {
      user,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 'success',
    message: 'Get user',
    data: {
      user,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 'success',
    message: 'Update user',
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res
    .status(204)
    .json({ status: 'success', message: 'Delete user', data: null });
});
