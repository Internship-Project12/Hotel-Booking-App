import mongoose from 'mongoose';
import User from './userModel.js';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A hotel must have a name'],
      minlength: [5, 'A hotel name must have more or equal then 5 characters'],
    },

    hotelStar: {
      type: Number,
    },
    imageCover: {
      type: String,
      required: [true, 'A hotel must have a cover image'],
    },
    hotelImages: {
      type: [String],
      required: [true, 'A hotel must have additional images'],
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'A hotel must have an address'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A hotel must have a summary'],
      minlength: [
        50,
        'A hotel summary must have more or equal then 20 characters',
      ],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A hotel must have a description'],
      minlength: [
        50,
        'A hotel description must have more or equal then 50 characters',
      ],
    },
    facilities: {
      type: [String],
      required: [true, 'hotels must have some facilities'],
    },

    // hotel managers' id
    manager: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A hotel must have a manager'],
    },

    // ****************************************************** //

    // the below two props will be calculated automatically on the creation of a room
    minPricePerNight: {
      type: Number,
      min: 0,
      default: 0,
    },
    numOfRooms: {
      type: Number,
      default: 0,
    },

    // this two will be calculated on the creation of a review
    numOfRatings: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// link/add the hotel id to the manager's doc
hotelSchema.pre('save', async function (next) {
  await User.findByIdAndUpdate(this.manager, {
    hotel: this._id,
    role: 'manager',
  });

  next();
});

// Note: virtual populate is a two step populate.
// 1st we add a virtual rooms prop to the model which has a ref
// 2nd we populate that prop on querying that model
hotelSchema.virtual('rooms', {
  ref: 'Room',
  foreignField: 'hotel',
  localField: '_id',
});

hotelSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'hotel',
  localField: '_id',
});

hotelSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'hotel',
  localField: '_id',
});

// hotelSchema.pre(/^find/, function (next) {
//   if (
//     !this.user
//     // ||
//     // this.user?.role === 'user' ||
//     // this.user?.role === 'manager'
//   ) {
//     this.find({ numOfRooms: { $gt: 0 } });
//   }

//   console.log(this.user)

//   next();
// });

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
