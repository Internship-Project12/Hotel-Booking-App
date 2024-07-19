import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import RoomsListItem from "../ui/RoomsListItem";
import { useQuery } from "@tanstack/react-query";
import QueryKey from "../constants/QueryKey";
import apiRooms from "../services/apiRooms";
import { useHotel } from "../features/hotels/useHotel";
import SpinnerMini from "../ui/SpinnerMini";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import RoomTypeFilter from "../components/RoomTypeFilter";
import { useState } from "react";

function RoomsListPage() {
  const { hotelId } = useParams();
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const navigate = useNavigate();

  const {
    data: { data: { data: hotel } = {} } = {},
    isLoading: isLoadingHotel,
    isError,
    error,
  } = useHotel({ id: hotelId });

  const { data: { data: { rooms } = {} } = {}, isLoading: isLoadingRooms } =
    useQuery({
      queryKey: [QueryKey.ROOMS, hotelId, selectedRoomTypes],
      queryFn: () =>
        apiRooms.getAllRoomsOnHotel({ hotelId, selectedRoomTypes }),
      retry: false,
    });

  if (isError) {
    toast.error(
      error?.response?.message || "No Hotel Found. 404); please try again",
    );

    return navigate(`/hotels/${hotelId}`);
  }

  const handleRoomTypeChange = (e) => {
    const selectedType = e.target.value;

    setSelectedRoomTypes((prev) =>
      e.target.checked
        ? [...prev, selectedType]
        : prev.filter((type) => type !== selectedType),
    );
  };

  return (
    <div className="relative flex w-full justify-between gap-4 rounded-lg border bg-slate-200 p-6 shadow-xl">
      {/* filter/sort */}
      <div className="sticky top-0 h-fit w-[20%] space-y-8 rounded-lg border-2 border-r-2 border-t-2 bg-blue-50">
        <div className="flex flex-col items-center justify-center gap-6">
          <RoomTypeFilter
            selectedRoomTypes={selectedRoomTypes}
            onChange={handleRoomTypeChange}
          />
        </div>
      </div>

      {/* rooms list  */}
      <div className="absolute -top-[2rem] left-[50%] z-30 flex -translate-x-[50%] flex-col items-center justify-center gap-2 p-4 text-blue-600">
        <Link
          to={`/hotels/${hotelId}`}
          style={{ "backface-visibility": "hidden" }}
          className="z-10 w-[45rem] bg-blue-600 p-3 text-center text-4xl font-bold text-slate-300 opacity-95 shadow-lg"
        >
          {isLoadingHotel ? <SpinnerMini /> : hotel?.name}
        </Link>
        <h2
          style={{ "backface-visibility": "hidden" }}
          className="z-10 w-[25rem] bg-blue-600 p-2 text-center text-xl font-bold capitalize text-slate-300 shadow-lg"
        >
          There are a total of{" "}
          {isLoadingHotel ? <SpinnerMini /> : hotel?.numOfRooms} rooms found In
          this hotel
        </h2>
      </div>

      <section className="mt-[6rem] w-[50%] rounded-md border-l-2 border-r-2 bg-slate-100 py-4 shadow-lg">
        {isLoadingRooms ? (
          <Spinner />
        ) : rooms.length > 0 ? (
          rooms.map((room, i) => <RoomsListItem key={i} room={room} />)
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-2xl capitalize text-slate-600">
              404 ): There are no rooms found.
            </p>
          </div>
        )}
      </section>

      {/* room detail page */}
      <section className="h-fit w-[27%] flex-1 overflow-hidden rounded-xl border-l-2 border-r-2 bg-slate-100 shadow-lg">
        <Outlet />
      </section>
      {/* <section></section> */}
    </div>
  );
}

export default RoomsListPage;