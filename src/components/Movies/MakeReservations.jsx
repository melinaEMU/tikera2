import SelectSeats from "./SelectSeats";
import SelectTickets from "./SelectTickets";
import Summary from "./Summary";

const MakeReservations = ({
  reservationService,
  handleSuccessfullReservation,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-4 max-w-[75%] text-center bg-rose-950 text-white rounded border-4 border-amber-400">
      <SelectTickets reservationService={reservationService} />
      <SelectSeats reservationService={reservationService} />
      <Summary
        reservationService={reservationService}
        handleSuccessfullReservation={handleSuccessfullReservation}
      />
    </div>
  );
};

export default MakeReservations;
