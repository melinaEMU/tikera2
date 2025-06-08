import MovieListItem from "./MovieListItem";

const MovieList = ({
  moviesByWeekData,
  selectedMovieId,
  handleChangeSelectedMovieId,
}) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {moviesByWeekData.map((movieData) => (
        <MovieListItem
          key={`movie-${movieData.id}`}
          movieData={movieData}
          selectedMovieId={selectedMovieId}
          handleChangeSelectedMovieId={handleChangeSelectedMovieId}
        />
      ))}
    </div>
  );
};

export default MovieList;
