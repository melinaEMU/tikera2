const ReservationItem = ({
  image_path,
  dateTime,
  ticket_types,
  seats,
  title,
}) => {
  const dateTimeObject = new Date(dateTime);
  const date = dateTimeObject.toISOString().split("T")[0];
  const time = dateTimeObject.toTimeString().slice(0, 5);

  return (
    <div className="flex flex-col text-center w-60 flex-shrink-0 border-4 border-amber-400 rounded bg-rose-950 text-white">
      <img
        className="border-2 border-black rounded"
        src={image_path}
        alt={image_path}
      />
      <h1 className="text-xl font-bold">{title}</h1>
      <h3 className="text-lg font-bold">{date}</h3>
      <h3 className="text-lg font-bold">{time}</h3>
      <h4 className="mt-4 font-bold">Tickets:</h4>
      <ul>
        {ticket_types.map((ticketType, index) => (
          <li key={`type-${index}`}>
            {ticketType.type.charAt(0).toUpperCase() + ticketType.type.slice(1)}
            : {ticketType.quantity ?? ticketType.count}x
          </li>
        ))}
      </ul>
      <h4 className="mt-4 font-bold">Seats:</h4>
      <ul className="mb-4">
        {seats.map((seat, index) => (
          <li key={`seat-${index}`}>
            {seat.row}. Row {seat.seat}. Seat
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationItem;
