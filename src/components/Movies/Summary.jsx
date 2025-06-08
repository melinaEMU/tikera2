import classNames from "classnames";
import { useCreateBookingMutation } from "../../slices/apiSlice";

const Summary = ({ reservationService, handleSuccessfullReservation }) => {
  //Hooks
  const {
    movieTitle,
    screeningData,
    screeningTime,
    adultTicketCount,
    studentTicketCount,
    retiredTicketCount,
    totalTicketCount,
    adultTicketPrice,
    studentTicketPrice,
    retiredTicketPrice,
    totalTicketPrice,
    placedSeatCount,
    reservedSeatObjects,
    reservedTicketsObjects,
    screeningId,
    setSeassonFlash,
    reservationError,
    setReservationError,
  } = reservationService;
  const [sendCreateBooking] = useCreateBookingMutation();

  //Handlers
  const handleReservationClick = async () => {
    try {
      await sendCreateBooking({
        screening_id: screeningId,
        seats: reservedSeatObjects,
        ticket_types: reservedTicketsObjects,
      }).unwrap();
      setReservationError("");
      setSeassonFlash(
        "Successfull booking! For further inforamtion see 'Reservations' tab!"
      );
      handleSuccessfullReservation();
    } catch (currentError) {
      setReservationError(currentError.data.message);
    }
  };

  return (
    <div className="p-2">
      <h1 className="font-bold text-2xl">{movieTitle}</h1>
      <h2 className="font-bold text-xl">{screeningData}</h2>
      <h3 className="font-bold text-lg">{screeningTime}</h3>
      <div className="mt-4 flex flex-col justify-center">
        <h3 className="font-bold text-lg border-b-2 border-amber-400">
          Tickets
        </h3>
        <table className="table-fixed max-w-[200px] mx-auto">
          <tbody>
            {adultTicketCount > 0 && (
              <tr>
                <td className="p-2 font-bold">Adult</td>
                <td className="p-2">x{adultTicketCount}</td>
                <td>{adultTicketCount * adultTicketPrice}Ft</td>
              </tr>
            )}
            {studentTicketCount > 0 && (
              <tr>
                <td className="p-2 font-bold">Student</td>
                <td className="p-2">x{studentTicketCount}</td>
                <td>{studentTicketCount * studentTicketPrice}Ft</td>
              </tr>
            )}
            {retiredTicketCount > 0 && (
              <tr>
                <td className="p-2 font-bold">Retired</td>
                <td className="p-2">x{retiredTicketCount}</td>
                <td>{retiredTicketCount * retiredTicketPrice}Ft</td>
              </tr>
            )}
            {totalTicketCount > 0 && (
              <tr className="border-t-2 border-amber-400">
                <td className="p-2 font-bold">Total</td>
                <td className="p-2">x{totalTicketCount}</td>
                <td>{totalTicketPrice}Ft</td>
              </tr>
            )}
            {totalTicketCount === 0 && (
              <tr>
                <td>
                  <span className="text-rose-400 font-bold">
                    No tickets selected!
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col justify-center">
        <h3 className="font-bold text-lg border-b-2 border-amber-400 mb-2">
          Seats
        </h3>
        <table className="table-fixed max-w-[200px] mx-auto">
          <tbody>
            {placedSeatCount > 0 &&
              reservedSeatObjects.map((reservedSeatObject, index) => (
                <tr key={`seat-reservation-${index}`}>
                  <td className="pr-1">{reservedSeatObject.row}. Row</td>
                  <td>{reservedSeatObject.number}. Seat</td>
                </tr>
              ))}
            {placedSeatCount === 0 && (
              <tr>
                <td>
                  <span className="text-rose-400 font-bold">
                    No seats selected!
                  </span>
                </td>
              </tr>
            )}
            {placedSeatCount > 0 && totalTicketCount !== placedSeatCount && (
              <tr>
                <td colSpan="2">
                  <span className="text-rose-400 font-bold">
                    Not all seats selected!
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalTicketCount > 0 && totalTicketCount === placedSeatCount && (
        <button
          className={classNames(
            "py-2.5 px-5 mt-4 mb-4 border-4 rounded border-amber-400 font-bold text-xl text-white bg-fuchsia-950"
          )}
          onClick={() => handleReservationClick()}
        >
          Reserve Booking
        </button>
      )}
      {reservationError !== "" && (
        <div className="mb-4">
          <span className="text-rose-400 font-bold">{reservationError}</span>
        </div>
      )}
    </div>
  );
};

export default Summary;
