import classNames from "classnames";

const DateNavbar = ({
  selectedWeekday,
  handleChangeSelectedWeekday,
  selectedWeekNumber,
  handleMinusToSelectedWeekNumber,
  handlePlusToSelectedWeekNumber,
  selectedDate,
}) => {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex flex-col items-center">
      <nav>
        {weekDays.map((weekDay, index) => (
          <button
            key={`weekdaybutton-${index + 1}`}
            className={classNames(
              "py-2.5 px-5 m-1 border-2 rounded border-amber-400 font-bold",
              {
                "bg-rose-800 text-amber-400": selectedWeekday === index + 1,
                "bg-rose-950 text-white": selectedWeekday !== index + 1,
              }
            )}
            onClick={() => handleChangeSelectedWeekday(index + 1)}
          >
            {weekDay}
          </button>
        ))}
      </nav>
      <nav className="flex items-center">
        <button
          className="py-0.5 px-1 m-1 border-2 rounded border-amber-400 font-bold bg-fuchsia-950 text-white-700"
          onClick={() => handleMinusToSelectedWeekNumber()}
        >
          &lt;-
        </button>
        <h3 className="py-1 px-2 mx-2 border-2 rounded border-amber-400 bg-slate-950 text-white font-medium">
          {selectedWeekNumber}. week
        </h3>
        <button
          className="py-0.5 px-1 m-1 border-2 rounded border-amber-400 font-bold bg-fuchsia-950 text-white-700"
          onClick={() => handlePlusToSelectedWeekNumber()}
        >
          -&gt;
        </button>
      </nav>
      <h3 className="py-1 px-2 m-1 border-2 rounded border-amber-400 bg-slate-950 text-white font-medium">
        {selectedDate.getFullYear()}. {selectedDate.getMonth() + 1}.{" "}
        {selectedDate.getDate()}.
      </h3>
    </div>
  );
};

export default DateNavbar;
