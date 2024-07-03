import { hotels } from "../../data/hotels";
import HotelTableBody from "../../features/hotels/HotelTableBody";
import HotelTableHeading from "../../features/hotels/HotelTableHeading";

function Hotels() {
  return (
    <div className="m-6 bg-white p-3 font-lato text-gray-600 shadow-md">
      <h1 className="p-4 font-opensans text-2xl font-bold uppercase">
        All Hotels
      </h1>
      <HotelTableHeading />

      {hotels.map((hotel) => (
        <HotelTableBody key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default Hotels;