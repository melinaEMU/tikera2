import { useSelector } from "react-redux";
import { useGetSingleMovieQuery } from "../../slices/apiSlice";
import ScreeningTimeButton from "./ScreeningTimeButton";
import { selectToken } from "../../slices/tikeraSlice";

const MovieDetails = ({
  selectedMovieId,
  selectedWeekday,
  selectedWeekNumber,
  selectedDate,
  selectedScreeningId,
  handleChangeSelectedScreeningID,
  reservationService,
}) => {
  //Hooks
  const {
    data: singleMovieResult,
    isLoading,
    isError,
    error,
  } = useGetSingleMovieQuery(selectedMovieId);
  const token = useSelector(selectToken);

  if (isLoading) {
    return <p>Loading single movie...</p>;
  } else if (isError) {
    return (
      <p>
        Error occurred while loading single movie! <br /> Error:
        {error.toString()}
      </p>
    );
  } else {
    const singleMovieData = singleMovieResult.data;
    const allScreeningsData = singleMovieData.screenings;
    const selectedDayScreeningsData = allScreeningsData.filter(
      (screening) =>
        screening.week_number === selectedWeekNumber &&
        screening.week_day === selectedWeekday
    );

    return (
      <div className="flex justify-between items-center gap-4 p-2 mt-4 max-w-[75%] text-center bg-rose-950 text-white rounded border-4 border-amber-400 ">
        <img
          src={singleMovieData.image_path}
          alt={singleMovieData.image_path}
          className="w-32 h-auto rounded border-2 border-black"
        />
        <div className="text-left min-w-[25%]">
          <h3 className="font-bold text-lg">{singleMovieData.title}</h3>
          <p>{singleMovieData.release_year}</p>
          <p>{singleMovieData.genre}</p>
          <p>{singleMovieData.duration} minutes</p>
          <p className="font-bold">
            Screenings for {selectedDate.getFullYear()}.{" "}
            {selectedDate.getMonth() + 1}. {selectedDate.getDate()}:
          </p>
          {selectedDayScreeningsData.length === 0 && (
            <p className="text-rose-400 font-bold">
              There are no screenings for this day!
            </p>
          )}
          {selectedDayScreeningsData.length !== 0 && (
            <div>
              {selectedDayScreeningsData.map((screening) => (
                <ScreeningTimeButton
                  key={`ScreeningTimeButton-${screening.id}`}
                  screening={screening}
                  selectedScreeningId={selectedScreeningId}
                  handleChangeSelectedScreeningID={
                    handleChangeSelectedScreeningID
                  }
                  reservationService={reservationService}
                  movieTitle={singleMovieData.title}
                />
              ))}
              {token === null && (
                <p className="text-rose-400 font-bold">
                  You must be logged in to select a screening!
                </p>
              )}
            </div>
          )}
        </div>
        <cite>{singleMovieData.description}</cite>
      </div>
    );
  }
};

export default MovieDetails;
