import { useSelector } from "react-redux";
import {
  selectName,
  selectPage,
  selectRole,
  selectToken,
} from "../../slices/tikeraSlice";
import { Link } from "react-router";
import classNames from "classnames";

const Navbar = () => {
  const currentPage = useSelector(selectPage);
  const currentName = useSelector(selectName);
  const currentRole = useSelector(selectRole);
  const currentToken = useSelector(selectToken);

  return (
    <nav className="top-0 w-full p-2 flex justify-between items-center bg-neutral-950 border-b-1 border-neutral-700">
      <div className="flex">
        <Link to="/">
          <button
            className={classNames(
              "py-1 px-2 mx-2 border-2 rounded border-amber-400 font-medium",
              {
                "bg-rose-800 text-amber-400": currentPage === "MOVIES",
                "bg-rose-950 text-white": currentPage !== "MOVIES",
              }
            )}
          >
            tIKera
          </button>
        </Link>
        {!!currentToken && (
          <Link to="/reservations">
            <button
              className={classNames(
                "py-1 px-2 mx-2 border-2 rounded border-amber-400 font-medium",
                {
                  "bg-rose-800 text-amber-400": currentPage === "RESERVATIONS",
                  "bg-rose-950 text-white": currentPage !== "RESERVATIONS",
                }
              )}
            >
              Reservations
            </button>
          </Link>
        )}
        {!!currentToken && currentRole === "admin" && (
          <Link to="/create_movie">
            <button
              className={classNames(
                "py-1 px-2 mx-2 border-2 rounded border-amber-400 font-medium",
                {
                  "bg-rose-800 text-amber-400": currentPage === "CREATE_MOVIE",
                  "bg-rose-950 text-white": currentPage !== "CREATE_MOVIE",
                }
              )}
            >
              Create Movie
            </button>
          </Link>
        )}
        {!!currentToken && currentRole === "admin" && (
          <Link to="/create_screening">
            <button
              className={classNames(
                "py-1 px-2 mx-2 border-2 rounded border-amber-400 font-medium",
                {
                  "bg-rose-800 text-amber-400": currentPage === "CREATE_SCREENING",
                  "bg-rose-950 text-white": currentPage !== "CREATE_SCREENING",
                }
              )}
            >
              Create Screening
            </button>
          </Link>
        )}
      </div>
      <div className="flex">
        {!!currentToken && (
          <span className="py-1 px-2 mx-2 border-2 rounded border-amber-400 bg-slate-950 text-white font-medium">
            {currentRole}: {currentName}
          </span>
        )}
        {!!currentToken && (
          <Link to="/logout">
            <button className="py-1 px-2 mx-2 border-2 rounded border-amber-400 bg-fuchsia-950 text-white font-medium">
              Logout
            </button>
          </Link>
        )}
        {!currentToken && (
          <Link to="/login">
            <button
              className={classNames(
                "py-1 px-2 mx-2 border-2 rounded border-amber-400 font-medium",
                {
                  "bg-rose-800 text-amber-400": currentPage === "LOGIN",
                  "bg-rose-950 text-white": currentPage !== "LOGIN",
                }
              )}
            >
              Login
            </button>
          </Link>
        )}
        {!currentToken && (
          <Link to="/register">
            <button
              className={classNames(
                "py-1 px-2 mx-2 border-2 rounded border-amber-400 font-medium",
                {
                  "bg-rose-800 text-amber-400": currentPage === "REGISTER",
                  "bg-rose-950 text-white": currentPage !== "REGISTER",
                }
              )}
            >
              Register
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
