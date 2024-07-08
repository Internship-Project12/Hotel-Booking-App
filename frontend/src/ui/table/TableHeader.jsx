/* eslint-disable react/prop-types */
function TableHeader({ columns }) {
  return (
    <div
      className={`mb-2 grid grid-cols-${columns.length} items-start justify-items-start gap-3 border border-slate-200 bg-slate-200 p-3 font-semibold`}
    >
      {columns.map((col, index) => (
        <div key={index} className="col-span-1">
          {col.label}
        </div>
      ))}
    </div>
  );
}

export default TableHeader;
