import { useDispatch } from "react-redux";
import { changePage } from "../../slices/tikeraSlice";
import { useEffect, useState } from "react";
import { useGetMoviesByWeekQuery } from "../../slices/apiSlice";
import { addDays, addWeeks, getISOWeek, startOfWeek } from "date-fns";
import DateNavbar from "./DateNavbar";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import MakeReservations from "./MakeReservations";
import useReservation from "../../hooks/useReservation";

const Movies = () => {
  //Today's Date
  const todayDate = new Date();
  const todayWeekday = todayDate.getDay() === 0 ? 7 : todayDate.getDay();
  const todayWeekNumber = getISOWeek(todayDate);

  //States
  const [selectedWeekday, setSelectedWeekday] = useState(todayWeekday);
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(todayWeekNumber);
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedScreeningId, setSelectedScreeningId] = useState(null);

  //Hooks
  const dispatch = useDispatch();
  const {
    data: moviesByWeekData,
    isLoading,
    isError,
    error,
  } = useGetMoviesByWeekQuery(selectedWeekNumber);
  const reservationService = useReservation();
  const { seassonFlash } = reservationService;

  //Handlers
  const handleChangeSelectedWeekday = (newWeekday) => {
    setSelectedWeekday(newWeekday);
    const startOfSelectedWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    setSelectedDate(addDays(startOfSelectedWeek, newWeekday - 1));
    setSelectedMovieId(null);
    setSelectedScreeningId(null);
  };
  const handleMinusToSelectedWeekNumber = () => {
    setSelectedWeekNumber(selectedWeekNumber - 1);
    setSelectedDate(addWeeks(selectedDate, -1));
    setSelectedMovieId(null);
    setSelectedScreeningId(null);
  };
  const handlePlusToSelectedWeekNumber = () => {
    setSelectedWeekNumber(selectedWeekNumber + 1);
    setSelectedDate(addWeeks(selectedDate, 1));
    setSelectedMovieId(null);
    setSelectedScreeningId(null);
  };
  const handleChangeSelectedMovieId = (newMovieId) => {
    setSelectedMovieId(newMovieId);
    setSelectedScreeningId(null);
  };
  const handleChangeSelectedScreeningID = (newScreeningId) => {
    setSelectedScreeningId(newScreeningId);
  };
  const handleSuccessfullReservation = () => {
    setSelectedScreeningId(null);
  };

  //Effects
  useEffect(() => {
    dispatch(changePage("MOVIES"));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading movies by week...</p>;
  } else if (isError) {
    return (
      <p>
        Error occurred while loading movies by week! <br /> Error:
        {error.toString()}
      </p>
    );
  } else {
    return (
      <div className="mt-4 flex flex-col items-center">
        <DateNavbar
          selectedWeekday={selectedWeekday}
          handleChangeSelectedWeekday={handleChangeSelectedWeekday}
          selectedWeekNumber={selectedWeekNumber}
          handleMinusToSelectedWeekNumber={handleMinusToSelectedWeekNumber}
          handlePlusToSelectedWeekNumber={handlePlusToSelectedWeekNumber}
          selectedDate={selectedDate}
        />
        <MovieList
          moviesByWeekData={moviesByWeekData.data}
          selectedMovieId={selectedMovieId}
          handleChangeSelectedMovieId={handleChangeSelectedMovieId}
        />
        {!!selectedMovieId && (
          <MovieDetails
            selectedMovieId={selectedMovieId}
            selectedWeekday={selectedWeekday}
            selectedWeekNumber={selectedWeekNumber}
            selectedDate={selectedDate}
            selectedScreeningId={selectedScreeningId}
            handleChangeSelectedScreeningID={handleChangeSelectedScreeningID}
            reservationService={reservationService}
          />
        )}
        {seassonFlash !== "" && (
          <div className="m-4 bg-green-300 p-4 border-4 border-green-800 rounded">
            <span className="text-green-950 font-bold">{seassonFlash}</span>
          </div>
        )}
        {!!selectedScreeningId && (
          <MakeReservations
            reservationService={reservationService}
            handleSuccessfullReservation={handleSuccessfullReservation}
          />
        )}
      </div>
    );
  }
};

export default Movies;
