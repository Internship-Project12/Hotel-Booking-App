import { Link } from "react-router-dom";
import HotelTableBody from "./HotelTable";
import HotelTableHeader from "./HotelTableHeader";
import { useHotels } from "./useHotels";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";

function AllHotels() {
  const { register, handleSubmit } = useForm();

  const { data, isLoading } = useHotels();

  // LOADING PLACEHOLDER
  if (isLoading)
    return (
      <div className="w-full bg-white text-gray-600 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="p-4 uppercase">All Hotels</h1>
          <Link
            to={"/dashboard/add-hotel"}
            className="mr-2 cursor-pointer rounded bg-blue-700 px-4 py-[6px] text-lg text-white"
          >
            Add Hotel
          </Link>
        </div>

        <HotelTableHeader />

        <Spinner />
      </div>
    );

  const { data: hotels } = data.data;

  const onSubmitHandler = handleSubmit((data) => {
    if(!data?.search) return;
    console.log(data);
  });

  return (
    <div className="w-full bg-white text-gray-600 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="p-4 uppercase">All Hotels</h1>

        <form
          className="group flex items-center justify-center"
          onSubmit={onSubmitHandler}
        >
          <div className="">
            <input
              type="search"
              className="rounded-full bg-slate-200 px-3 py-2 focus:outline-none"
              placeholder="Search"
              {...register("search")}
            />
            <button
              type="submit"
              className="-ml-16 w-24 rounded-full bg-blue-600 px-3 py-2 text-white"
            >
              Search
            </button>
          </div>
        </form>

        <Link
          to={"/dashboard/add-hotel"}
          className="mr-2 cursor-pointer rounded bg-blue-700 px-4 py-[6px] text-lg text-white"
        >
          Add Hotel
        </Link>
      </div>

      <HotelTableHeader />

      {hotels.map((hotel) => (
        <HotelTableBody key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default AllHotels;
