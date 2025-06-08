import classNames from "classnames";

const MovieListItem = ({
  movieData,
  selectedMovieId,
  handleChangeSelectedMovieId,
}) => {
  return (
    <button
      className={classNames(
        "w-[250px] text-center rounded-lg border-4 border-amber-400",
        {
          "bg-rose-950 text-white": selectedMovieId !== movieData.id,
          "bg-rose-800 text-amber-400": selectedMovieId === movieData.id,
        }
      )}
      onClick={() => handleChangeSelectedMovieId(movieData.id)}
    >
      <img className="rounded border-2 border-black" src={movieData.image_path} alt={movieData.image_path} />
      <h3 className="font-bold">{movieData.title}</h3>
      <p>{movieData.genre}</p>
      <p>{movieData.duration} minutes</p>
    </button>
  );
};

export default MovieListItem;
