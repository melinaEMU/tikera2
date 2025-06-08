const SelectTickets = ({ reservationService }) => {
  const {
    adultTicketPrice,
    studentTicketPrice,
    retiredTicketPrice,
    totalTicketPrice,
    adultTicketCount,
    studentTicketCount,
    retiredTicketCount,
    totalTicketCount,
    handlePlusAdultTicket,
    handleMinusAdultTicket,
    handlePlusStudentTicket,
    handleMinusStudentTicket,
    handlePlusRetiredTicket,
    handleMinusRetiredTicket,
  } = reservationService;

  return (
    <div className="p-2">
      <h3 className="font-bold border-b-2 border-amber-400 text-lg">
        Select tickets!
      </h3>
      <table>
        <tbody>
          <tr>
            <td>
              <h1 className="p-2 font-bold">Adult</h1>
            </td>
            <td>
              <cite className="p-2">{adultTicketPrice}Ft</cite>
            </td>
            <td>
              <button
                onClick={() => handleMinusAdultTicket()}
                className="flex items-center justify-center pb-1 border-2 rounded border-amber-400 bg-fuchsia-950 text-amber-400 w-6 h-6 font-bold"
              >
                -
              </button>
            </td>
            <td className="p-2">{adultTicketCount}</td>
            <td>
              <button
                onClick={() => handlePlusAdultTicket()}
                className="flex items-center justify-center pb-1 border-2 rounded border-amber-400 bg-fuchsia-950 text-amber-400 w-6 h-6 font-bold"
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <h1 className="p-2 font-bold">Student</h1>
            </td>
            <td>
              <cite className="p-2">{studentTicketPrice}Ft</cite>
            </td>
            <td>
              <button
                onClick={() => handleMinusStudentTicket()}
                className="flex items-center justify-center pb-1 border-2 rounded border-amber-400 bg-fuchsia-950 text-amber-400 w-6 h-6 font-bold"
              >
                -
              </button>
            </td>
            <td className="p-2">{studentTicketCount}</td>
            <td>
              <button
                onClick={() => handlePlusStudentTicket()}
                className="flex items-center justify-center pb-1 border-2 rounded border-amber-400 bg-fuchsia-950 text-amber-400 w-6 h-6 font-bold"
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <h1 className="p-2 font-bold">Retired</h1>
            </td>
            <td>
              <cite className="p-2">{retiredTicketPrice}Ft</cite>
            </td>
            <td>
              <button
                onClick={() => handleMinusRetiredTicket()}
                className="flex items-center justify-center pb-1 border-2 rounded border-amber-400 bg-fuchsia-950 text-amber-400 w-6 h-6 font-bold"
              >
                -
              </button>
            </td>
            <td className="p-2">{retiredTicketCount}</td>
            <td>
              <button
                onClick={() => handlePlusRetiredTicket()}
                className="flex items-center justify-center pb-1 border-2 rounded border-amber-400 bg-fuchsia-950 text-amber-400 w-6 h-6 font-bold"
              >
                +
              </button>
            </td>
          </tr>
          <tr className="border-t-2 border-amber-400">
            <td>
              <h1 className="p-2 font-bold">Total</h1>
            </td>
            <td>
              <cite className="p-2">{totalTicketPrice}Ft</cite>
            </td>
            <td></td>
            <td className="p-2">{totalTicketCount}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SelectTickets;
