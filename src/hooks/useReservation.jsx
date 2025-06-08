import { useState } from "react";

const useReservation = () => {
  //Consts
  const adultTicketPrice = 2500;
  const studentTicketPrice = 2000;
  const retiredTicketPrice = 1800;

  //States
  const [movieTitle, setMovieTitle] = useState("");
  const [screeningId, setScreeningId] = useState(0);
  const [screeningData, setScreeningData] = useState(null);
  const [screeningTime, setScreeningTime] = useState(null);
  const [adultTicketCount, setAdultTicketCount] = useState(0);
  const [studentTicketCount, setStudentTicketCount] = useState(0);
  const [retiredTicketCount, setRetiredTicketCount] = useState(0);
  const [seatMatrix, setSeatMatrix] = useState([]);
  const [reservationError, setReservationError] = useState("");
  const [seassonFlash, setSeassonFlash] = useState("");

  //Calculated Values
  const totalTicketCount =
    adultTicketCount + studentTicketCount + retiredTicketCount;
  const totalTicketPrice =
    adultTicketCount * adultTicketPrice +
    studentTicketCount * studentTicketPrice +
    retiredTicketCount * retiredTicketPrice;
  const screeningCapacity =
    seatMatrix.length > 0 ? seatMatrix.length * seatMatrix[0].length : 0;
  const availableTicketCount =
    screeningCapacity -
    seatMatrix.flat().filter((seat) => seat === 1).length -
    totalTicketCount;
  const placedSeatCount = seatMatrix.flat().filter((seat) => seat === 2).length;
  const reservedSeatObjects = seatMatrix
    .map((currentRow, currentRowIndex) =>
      currentRow.map((currentSeat, currentSeatIndex) =>
        currentSeat === 2
          ? { row: currentRowIndex + 1, number: currentSeatIndex + 1 }
          : null
      )
    )
    .flat()
    .filter((seatObject) => seatObject !== null);
  const reservedTicketsObjects = [];
  if (adultTicketCount > 0) {
    reservedTicketsObjects.push({ type: "normal", quantity: adultTicketCount });
  }
  if (studentTicketCount > 0) {
    reservedTicketsObjects.push({
      type: "student",
      quantity: studentTicketCount,
    });
  }
  if (retiredTicketCount > 0) {
    reservedTicketsObjects.push({
      type: "senior",
      quantity: retiredTicketCount,
    });
  }

  //Functions
  const initReservation = (screeningData, title) => {
    setMovieTitle(title);
    setScreeningId(screeningData.id);
    setScreeningData(screeningData.date);
    setScreeningTime(screeningData.start_time);
    setSeassonFlash("");
    setReservationError("");
    setAdultTicketCount(0);
    setStudentTicketCount(0);
    setRetiredTicketCount(0);
    loadSeatMatrix(screeningData);
  };

  const loadSeatMatrix = (screeningData) => {
    const rowCount = screeningData.room.rows;
    const seatCount = screeningData.room.seatsPerRow;

    const newSeatMatrix = Array.from({ length: rowCount }, () =>
      Array.from({ length: seatCount }, () => 0)
    );

    screeningData.bookings.forEach(({ row, seat }) => {
      newSeatMatrix[row - 1][seat - 1] = 1;
    });

    setSeatMatrix(newSeatMatrix);
  };

  //Handlers
  const handlePlusAdultTicket = () => {
    if (availableTicketCount > 0) {
      setAdultTicketCount(adultTicketCount + 1);
    }
  };
  const handleMinusAdultTicket = () => {
    if (adultTicketCount > 0 && placedSeatCount < totalTicketCount) {
      setAdultTicketCount(adultTicketCount - 1);
    }
  };
  const handlePlusStudentTicket = () => {
    if (availableTicketCount > 0) {
      setStudentTicketCount(studentTicketCount + 1);
    }
  };
  const handleMinusStudentTicket = () => {
    if (studentTicketCount > 0 && placedSeatCount < totalTicketCount) {
      setStudentTicketCount(studentTicketCount - 1);
    }
  };
  const handlePlusRetiredTicket = () => {
    if (availableTicketCount > 0) {
      setRetiredTicketCount(retiredTicketCount + 1);
    }
  };
  const handleMinusRetiredTicket = () => {
    if (retiredTicketCount > 0 && placedSeatCount < totalTicketCount) {
      setRetiredTicketCount(retiredTicketCount - 1);
    }
  };
  const handleSeatClick = (rowIndex, seatIndex, seat) => {
    if (seat === 0 && totalTicketCount > placedSeatCount) {
      const newSeatMatrix = seatMatrix.map((currentRow, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? currentRow.map((currentSeat, currentSeatIndex) =>
              currentSeatIndex === seatIndex ? 2 : currentSeat
            )
          : [...currentRow]
      );
      setSeatMatrix(newSeatMatrix);
    } else if (seat === 2) {
      const newSeatMatrix = seatMatrix.map((currentRow, currentRowIndex) =>
        currentRowIndex === rowIndex
          ? currentRow.map((currentSeat, currentSeatIndex) =>
              currentSeatIndex === seatIndex ? 0 : currentSeat
            )
          : [...currentRow]
      );
      setSeatMatrix(newSeatMatrix);
    }
  };

  return {
    adultTicketPrice,
    studentTicketPrice,
    retiredTicketPrice,
    totalTicketPrice,
    adultTicketCount,
    studentTicketCount,
    retiredTicketCount,
    totalTicketCount,
    placedSeatCount,
    movieTitle,
    screeningId,
    seatMatrix,
    reservedSeatObjects,
    reservedTicketsObjects,
    screeningData,
    screeningTime,
    reservationError,
    seassonFlash,
    initReservation,
    handlePlusAdultTicket,
    handleMinusAdultTicket,
    handlePlusStudentTicket,
    handleMinusStudentTicket,
    handlePlusRetiredTicket,
    handleMinusRetiredTicket,
    handleSeatClick,
    setSeassonFlash,
    setReservationError,
  };
};

export default useReservation;
