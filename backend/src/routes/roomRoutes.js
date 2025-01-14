import express from 'express';
import roomController from '../controllers/roomController.js';
import authController from '../controllers/authController.js';
import upload from '../middlewares/multerMiddleware.js';
import bookingRouter from './bookingRoutes.js';

const router = express.Router({ mergeParams: true });

router.use('/:roomId/bookings', bookingRouter);

router.get('/availableRooms', roomController.getAvailableRoomsOnHotel)

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    upload.array('RoomImageFiles', 10),
    roomController.createRoom
  );

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    upload.array('RoomImageFiles', 10),
    roomController.updateRoom
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    roomController.deleteRoom
  );

export default router;
