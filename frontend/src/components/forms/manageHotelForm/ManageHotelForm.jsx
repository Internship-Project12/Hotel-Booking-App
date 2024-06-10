/* eslint-disable react/prop-types */
import { FormProvider, useForm } from "react-hook-form";

import DetailSection from "./DetailSection";
import ImageSection from "./ImageSection";
import SummarySection from "./SummarySection";

function ManageHotelForm({ isPending, onSubmit }) {
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmitHandler}
        className="m-auto flex max-w-[85%] flex-col gap-8 rounded bg-slate-100 p-10 shadow-lg"
      >
        <DetailSection />
        <SummarySection />
        <ImageSection />
        <button
          type="submit"
          className="w-full rounded bg-blue-800 px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isPending}
        >
          Add Hotel
        </button>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;