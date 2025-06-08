import classNames from "classnames";

const SeatButton = ({
  reservationService,
  rowIndex,
  seatIndex,
  currentSeat,
}) => {
  const { handleSeatClick } = reservationService;
  return (
    <div className="p-1">
      <button
        className={classNames(
          "relative w-10 h-10 rounded border-2 border-amber-400 flex items-end justify-center",
          {
            "bg-amber-700": currentSeat === 0,
            "bg-slate-600 border-white": currentSeat === 1,
            "bg-rose-800": currentSeat === 2,
          }
        )}
        disabled={currentSeat === 1}
        onClick={() => handleSeatClick(rowIndex, seatIndex, currentSeat)}
      >
        <div className="absolute left-0 top-1/4 w-1 h-5 bg-amber-400 rounded-sm -translate-x-full"></div>
        <div className="absolute right-0 top-1/4 w-1 h-5 bg-amber-400 rounded-sm translate-x-full"></div>
        <div className="w-full h-2 bg-amber-400"></div>
      </button>
    </div>
  );
};

export default SeatButton;
