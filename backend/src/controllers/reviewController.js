import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';
import Review from '../models/reviewModel.js';

const getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: 'success',
    message: 'get all reviews',
    data: {
      reviews,
    },
  });
});

const getReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError('there is no review found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'get review',
    data: {
      review,
    },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  res.status(200).json({
    status: 'success',
    message: 'create review',
    data: {
      review
    }
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'update review',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'delete review',
  });
});

const reviewController = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewController;
