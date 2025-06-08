import SeatButton from "./SeatButton";

const SelectSeats = ({ reservationService }) => {
  const { seatMatrix, totalTicketCount, placedSeatCount } = reservationService;
  return (
    <div className="border-b-4 border-t-4 border-amber-400 p-2">
      <h3 className="font-bold border-b-2 border-amber-400 text-lg mb-2">
        Select seats! {placedSeatCount}/{totalTicketCount}
      </h3>
      <table>
        <tbody>
          {seatMatrix.map((currentRow, rowIndex) => (
            <tr key={`seatMatrix-row-${rowIndex}`}>
              {currentRow.map((currentSeat, seatIndex) => (
                <td key={`seatMatrix-seat-${seatIndex}`}>
                  <SeatButton
                    reservationService={reservationService}
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    currentSeat={currentSeat}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectSeats;
