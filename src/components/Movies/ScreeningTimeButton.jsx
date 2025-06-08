import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectToken } from "../../slices/tikeraSlice";

const ScreeningTimeButton = ({
  screening,
  selectedScreeningId,
  handleChangeSelectedScreeningID,
  reservationService,
  movieTitle,
}) => {
  //Hooks
  const token = useSelector(selectToken);
  const { initReservation } = reservationService;

  //Time
  const now = new Date();
  const nowDate = now.toISOString().split("T")[0];
  const nowTime = now.toTimeString().slice(0, 5);

  //Calculated Values
  const seatCount = screening.room.rows * screening.room.seatsPerRow;
  const isFull = screening.bookings.length === seatCount;
  const isPast =
    screening.date < nowDate ||
    (screening.date === nowDate && screening.start_time < nowTime);

  return (
    <button
      className={classNames(
        "py-0.5 px-1 m-1 border-2 rounded border-amber-400 font-bold",
        {
          "bg-neutral-600 text-neutral-800 border-white":
            token === null || isFull || isPast,
          "bg-rose-800 text-amber-400":
            token !== null &&
            !isFull &&
            !isPast &&
            selectedScreeningId === screening.id,
          "bg-rose-950 text-white":
            token !== null &&
            !isFull &&
            !isPast &&
            selectedScreeningId !== screening.id,
        }
      )}
      onClick={() => {
        handleChangeSelectedScreeningID(screening.id);
        initReservation(screening, movieTitle);
      }}
      disabled={token === null || isFull || isPast}
    >
      {screening.start_time}
    </button>
  );
};

export default ScreeningTimeButton;
