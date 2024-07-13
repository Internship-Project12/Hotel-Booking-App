import Bookings from "./Bookings";

const bookingHeaders = [
  { label: "User", key: "user" },
  { label: "Room Num", key: "room" },
  { label: "Check-In", key: "checkIn" },
  // { label: "Check-Out", key: "checkOut" },
  { label: "Num Of Nights", key: "numOfNights" },
  { label: "Price Per Night ", key: "pricePerNights" },
  { label: "status", key: "paymentStatus" },
];

const AllBookingsData = [
  {
    user: "Alemu",
    userImg: "/user1.jpeg",
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    room: `#${101}`,
    numOfNights: 5,
    pricePerNights: 250,
    paymentStatus: "Completed",
  },
  {
    user: "John Doe",
    userImg: "/user2.jpeg",
    room: `#${101}`,
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    numOfNights: 1,
    pricePerNights: 250,
    paymentStatus: "Pending",
  },
  {
    user: "Jane Smith",
    userImg: "/user3.jpeg",
    room: `#${101}`,
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    numOfNights: 2,
    pricePerNights: 250,
    paymentStatus: "Cancelled",
  },
  {
    user: "Alemu",
    userImg: "/user1.jpeg",
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    room: `#${101}`,
    numOfNights: 5,
    pricePerNights: 250,
    paymentStatus: "Completed",
  },
  {
    user: "John Doe",
    userImg: "/user2.jpeg",
    room: `#${101}`,
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    numOfNights: 1,
    pricePerNights: 250,
    paymentStatus: "Pending",
  },
  {
    user: "Jane Smith",
    userImg: "/user3.jpeg",
    room: `#${101}`,
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    numOfNights: 2,
    pricePerNights: 250,
    paymentStatus: "Cancelled",
  },
  {
    user: "Alemu",
    userImg: "/user1.jpeg",
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    room: `#${101}`,
    numOfNights: 5,
    pricePerNights: 250,
    paymentStatus: "Completed",
  },
  {
    user: "John Doe",
    userImg: "/user2.jpeg",
    room: `#${101}`,
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    numOfNights: 1,
    pricePerNights: 250,
    paymentStatus: "Pending",
  },
  {
    user: "Jane Smith",
    userImg: "/user3.jpeg",
    room: `#${101}`,
    checkIn: "22-05-2024",
    checkOut: "24-05-2024",
    numOfNights: 2,
    pricePerNights: 250,
    paymentStatus: "Cancelled",
  },
];

function HotelBookings() {
  return (
    <Bookings bookings={AllBookingsData} bookingHeaders={bookingHeaders} />
  );
}

export default HotelBookings;