/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import PhoneInput from "./PhoneInput";
import SpinnerMini from "../../ui/SpinnerMini";

function SignUpForm({ onSubmitHandler, isPending }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mt-2 flex w-full flex-col gap-6"
    >
      <h1 className="text-center text-2xl font-bold tracking-wider text-gray-800 lg:text-3xl">
        Sign Up
      </h1>

      <label className="flex flex-1 flex-col tracking-wider text-gray-900">
        <span className="ml-2 font-normal md:text-xl">First Name</span>
        <input
          type="text"
          defaultValue="John"
          className="w-full rounded-xl p-2 shadow-md focus:outline-none"
          placeholder="John"
          required
          {...register("firstName", {
            required: "first name is a required field",
          })}
        />
        {errors.firstName && (
          <p className="text-sm font-normal text-red-700">
            {errors.firstName.message}
          </p>
        )}
      </label>
      <label className="flex flex-1 flex-col tracking-wider text-gray-900">
        <span className="ml-2 font-normal md:text-xl">Last Name</span>
        <input
          type="text"
          defaultValue="A."
          className="w-full rounded-xl p-2 shadow-md focus:outline-none"
          placeholder="Doe"
          // required
          {...register("lastName", {
            required: "last name is a required field",
          })}
        />
        {errors.lastName && (
          <p className="text-sm font-normal text-red-700">
            {errors.lastName.message}
          </p>
        )}
      </label>
      <label className="flex flex-1 flex-col tracking-wider text-gray-900">
        <span className="ml-2 font-normal md:text-xl">Email</span>
        <input
          type="email"
          defaultValue="test@test.com"
          className="w-full rounded-xl p-2 shadow-md focus:outline-none"
          placeholder="test@test.com"
          // required
          {...register("email", {
            required: "email is a required field",
          })}
        />
        {errors.email && (
          <p className="text-sm font-normal text-red-700">
            {errors.email.message}
          </p>
        )}
      </label>
      <label className="flex flex-1 flex-col tracking-wider text-gray-900">
        <span className="ml-2 font-normal md:text-xl">Password</span>
        <input
          type="password"
          defaultValue="test1234"
          className="w-full rounded-xl p-2 shadow-md focus:outline-none"
          placeholder="**********"
          // required
          {...register("password", {
            required: "password is a required field",
          })}
        />
        {errors.password && (
          <p className="text-sm font-normal text-red-700">
            {errors.password.message}
          </p>
        )}
      </label>
      <label className="flex flex-1 flex-col tracking-wider text-gray-900">
        <span className="ml-2 font-normal md:text-xl">Password Confirm</span>
        <input
          type="password"
          defaultValue="test1234"
          className="w-full rounded-xl p-2 shadow-md focus:outline-none"
          placeholder="**********"
          // required
          {...register("passwordConfirm", {
            required: "password confirm is a required field",
          })}
        />
        {errors.passwordConfirm && (
          <p className="text-sm font-normal text-red-700">
            {errors.passwordConfirm.message}
          </p>
        )}
      </label>
      <PhoneInput />

      <button
        disabled={isPending}
        className="rounded bg-blue-600 px-3 py-2 text-xl text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
        type="submit"
      >
        {isPending ? <SpinnerMini /> : "Sign Up"}
      </button>
      <div>
        have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;
