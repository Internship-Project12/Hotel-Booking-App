function BookingTableHeading() {
  return (
    <div className="mb-2 grid grid-cols-9 items-center gap-3 border-b border-slate-300 bg-slate-300 p-3">
      <div className="col-span-2 col-start-1">Hotel</div>
      <div className="col-span-1 col-start-3">Room</div>
      <div className="col-span-1 col-start-4">user</div>
      <div className="col-span-1 col-start-5">checkInDate</div>
      <div className="col-span-1 col-start-6">numOfNights</div>
      <div className="col-span-1 col-start-7">pricePerNight</div>
      <div className="col-span-1 col-start-8">totalPrice</div>
      <div className="col-span-1 col-start-9">payment status</div>
    </div>
  );
}

export default BookingTableHeading;
