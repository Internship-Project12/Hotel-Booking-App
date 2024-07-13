import customFetch from "../utils/customFetch";

const addHotel = async (hotel) => await customFetch.post("/hotels", hotel);

const getAllHotels = async () => {
  const res = await customFetch.get("/hotels");

  return res.data;
};

const getHotel = async (id) => {
  try {
    const res = await customFetch.get(`/hotels/${id}`);
    const { data } = res;

    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const updateHotel = async ({ updatedHotelData, id }) => {
  try {
    const res = await customFetch.patch(`/hotels/${id}`, updatedHotelData);

    console.log(res);

    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

const deleteHotel = async (id) => {
  try {
    const res = await customFetch.delete(`/hotels/${id}`);

    const { data } = res;
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};

const apiHotels = {
  addHotel,
  getHotel,
  getAllHotels,
  deleteHotel,
  updateHotel,
};

export default apiHotels;