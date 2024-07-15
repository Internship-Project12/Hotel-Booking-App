/* eslint-disable react/prop-types */
function Search({ onSearchHandler, isLoading, register }) {
  return (
    <form
      className="group flex items-center justify-center"
      onSubmit={onSearchHandler}
    >
      <div className="">
        <input
          type="search"
          disabled={isLoading}
          autoFocus
          className="rounded-full bg-slate-200 px-3 py-2 focus:outline-none disabled:cursor-not-allowed"
          placeholder="Search"
          {...register("search")}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="-ml-16 w-24 rounded-full bg-blue-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;