import { StatusCodes } from 'http-status-codes';
import Hotel from '../models/hotelModel.js';
import catchAsync from '../utils/catchAsync.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import { deleteImages, uploadImages } from '../utils/images.js';
import User from '../models/userModel.js';
import Room from '../models/roomModel.js';
import Review from '../models/reviewModel.js';
import Booking from '../models/bookingModel.js';
import { CLOUDINARY_FOLDER_HOTELS } from '../constants/cloudinary_folders.js';

export const getAllHotels = catchAsync(async (req, res, next) => {
  // HERE WE DESTRUCTURE POSSIBLE VALUES FROM THE QUERY
  const { search, hotelStar, sort } = req.query;
  // FILTERING
  const queryObj = {};

  if (search) {
    queryObj.$or = [
      { name: { $regex: search, $options: 'i' } },
      // { address: { $regex: search, $options: 'i' } },
    ];
  }

  if (hotelStar) {
    queryObj.hotelStar = hotelStar;
  }

  // SORTING
  // possible values for sorting in hotels is d/t from users or others eg. sort by hotel star, there are no hotel star on other tables so we need to modify the req.query to use it on apiFeatures
  // on the front-end there are sort by letter from a-z or z-a | sort on hotel name
  if (sort) {
    req.query.sort =
      (sort === 'a-z' && 'name') ||
      (sort === 'z-a' && '-name') ||
      (sort === 'newest' && '-createdAt') ||
      (sort === 'oldest' && 'createdAt') ||
      (sort === 'minPricePerNight-desc' && '-minPricePerNight') ||
      (sort === 'minPricePerNight-asc' && 'minPricePerNight') ||
      (sort === 'avgRating-desc' && '-avgRating') ||
      (sort === 'avgRating-asc' && 'avgRating') ||
      (sort === 'hotelStar-desc' && '-hotelStar') ||
      (sort === 'hotelStar-asc' && 'hotelStar');
  }

  const features = new APIFeatures(Hotel.find(), req.query)
    // FILTERING IS SPECIFIC TO THE DATA WE FILTER SO I DON'T USE IT HERE
    .sort(sort)
    .limitFields()
    .paginate();

  let query = features.query.find(queryObj);

  // query.user = req.user;

  const hotels = await query;

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Get all hotels',
    results: hotels.length,
    data: {
      data: hotels,
    },
  });
});

export const createHotel = catchAsync(async (req, res, next) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // console.log(req.files, req.body);

  let imageCoverUrl;
  let hotelImagesUrl;

  if (req.files?.imageCoverFile || req.files?.hotelImagesFiles) {
    imageCoverUrl = await uploadImages(
      req.files.imageCoverFile,
      CLOUDINARY_FOLDER_HOTELS,
      next
    );
    hotelImagesUrl = await uploadImages(
      req.files.hotelImagesFiles,
      CLOUDINARY_FOLDER_HOTELS,
      next
    );
  }

  const hotel = await Hotel.create({
    ...req.body,
    imageCover: imageCoverUrl[0],
    hotelImages: hotelImagesUrl,
  });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Create a hotel',
    data: { data: hotel },
  });
});

export const getHotel = catchAsync(async (req, res, next) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { id } = req.params;

  const hotel = await Hotel.findById(id)
    .populate({
      path: 'rooms',
    })
    .populate({
      path: 'reviews',
    })
    .populate({
      path: 'manager',
      select: `firstName lastName email photo phoneNumber`,
    })
    .populate({
      path: 'bookings',
    });

  if (!hotel) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Get a hotel',
    data: { data: hotel },
  });
});

export const updateHotel = catchAsync(async (req, res, next) => {
  // get hotel and get images from hotel before update
  const hotelBeforeUpdate = await Hotel.findById(req.params.id);

  if (!hotelBeforeUpdate) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  // hotel has one image cover file. if there is a new image cover file, delete the old one
  if (req.files?.imageCoverFile) {
    await deleteImages(hotelBeforeUpdate.imageCover);
  }

  // filter images urls that are excluded or deleted on the updated doc
  const deletedImageUrls = hotelBeforeUpdate.hotelImages.filter(
    (url) => !req.body.hotelImages.includes(url)
  );

  // delete images
  if (deletedImageUrls.length > 0) {
    await deleteImages(...deletedImageUrls);
  }

  // find and update
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // IF THERE ARE IMAGE TO UPDATE
  let imageCoverUrl;
  let hotelImagesUrl;

  if (req.files?.imageCoverFile) {
    imageCoverUrl = await uploadImages(
      req.files.imageCoverFile,
      CLOUDINARY_FOLDER_HOTELS,
      next
    );
    hotel.imageCover = imageCoverUrl[0];
  }

  if (req.files?.hotelImagesFiles) {
    hotelImagesUrl = await uploadImages(
      req.files.hotelImagesFiles,
      CLOUDINARY_FOLDER_HOTELS,
      next
    );
    hotel.hotelImages = [
      ...(hotel?.hotelImages || []),
      ...(hotelImagesUrl || []),
    ];
  }

  await hotel.save({ validateBeforeSave: false });

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Get a hotel',
    data: {
      data: hotel,
    },
  });
});

export const deleteHotel = catchAsync(async (req, res, next) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const { id } = req.params;

  // IT IS STRICT TO DELETE A HOTEL
  // WHEN WE WANT TO DELETE A HOTEL WE SHOULD DELETE ALL THE DATA RELATED TO THAT HOTEL AS WELL
  // 1ST WE FIND THE HOTEL BY ID AND POPULATE ALL THE DOCS RELATED TO THE HOTEL
  // IF HOTEL THEN WE GO TO EACH ONE BY ONE AND DELETE THEM AS WELL IN ORDER TO NOT BREAK THE LOGIC
  const hotel = await Hotel.findById(id)
    .populate({
      path: 'rooms',
    })
    .populate({
      path: 'reviews',
    })
    .populate({
      path: 'manager',
      select: `firstName lastName email photo phoneNumber`,
    })
    .populate({
      path: 'bookings',
    });

  if (!hotel) {
    return next(new AppError('No hotel found with that ID', 404));
  }

  // DELETE ALL IMAGES OF THE HOTEL FROM CLOUDINARY STORAGE
  await deleteImages(hotel.imageCover, ...hotel.hotelImages);

  // WE UPDATE THE MANAGER TO A USER AND DELETE THE LINKED HOTEL
  await User.findByIdAndUpdate(hotel.manager._id, {
    role: 'user',
    hotel: undefined,
  });

  // DELETE ALL ROOM
  const roomPromises = hotel.rooms?.map(
    async (room) => await Room.findByIdAndDelete(room._id)
  );
  await Promise.all(roomPromises);

  // DELETE ALL IMAGES OF ROOMS
  const imgUrls = hotel.rooms?.flatMap((room) => room.images);
  await deleteImages(...imgUrls);

  // DELETE ALL REVIEWS
  const reviewPromises = hotel.reviews?.map(
    async (review) => await Review.findByIdAndDelete(review._id)
  );
  await Promise.all(reviewPromises);

  // DELETE ALL BOOKINGS
  const bookingPromises = hotel.bookings?.map(
    async (booking) => await Booking.findByIdAndDelete(booking._id)
  );
  await Promise.all(bookingPromises);

  // AND FINALLY KILL THE ELEPHANT
  await Hotel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'hotel deleted successfully ',
  });
});
