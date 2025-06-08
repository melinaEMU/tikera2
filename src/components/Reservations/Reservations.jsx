import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../slices/tikeraSlice";
import { useGetUserBookingsQuery } from "../../slices/apiSlice";
import ReservationItem from "./ReservationItem";

const Reservations = () => {
  //Time
  const now = new Date();

  //Hooks
  const dispatch = useDispatch();
  const {
    data: userBookingsResult,
    isLoading,
    isError,
    error,
  } = useGetUserBookingsQuery();

  //Effects
  useEffect(() => {
    dispatch(changePage("RESERVATIONS"));
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading user reservations...</p>;
  } else if (isError) {
    return (
      <p>
        Error occurred while loading movies by week! <br /> Error:
        {error.toString()}
      </p>
    );
  } else {
    const userBookingsData = userBookingsResult.data;

    const userPastBookings = userBookingsData
      .filter((booking) => new Date(booking.screening.start_time) < now)
      .sort(
        (booking1, booking2) =>
          new Date(booking2.screening.start_time) -
          new Date(booking1.screening.start_time)
      );

    const userUpcomingBookings = userBookingsData
      .filter((booking) => new Date(booking.screening.start_time) > now)
      .sort(
        (booking1, booking2) =>
          new Date(booking1.screening.start_time) -
          new Date(booking2.screening.start_time)
      );

    console.log(userUpcomingBookings);

    return (
      <div>
        <h1 className="m-4 text-4xl font-bold text-amber-400">
          My Reservations
        </h1>
        <h2 className="m-4 text-2xl font-bold text-amber-400">
          Upcoming Reservations
        </h2>
        <div className="overflow-x-auto p-4 flex gap-4 items-start">
          {userUpcomingBookings.map((booking, index) => (
            <ReservationItem
              key={`reservation-${index}`}
              image_path={booking.screening.movie.image_path}
              dateTime={booking.screening.start_time}
              ticket_types={booking.ticket_types}
              seats={booking.seats}
              title={booking.screening.movie.title}
            />
          ))}
          {userUpcomingBookings.length === 0 && (
            <p className="text-rose-400 font-bold">
              There are no upcoming reservations!
            </p>
          )}
        </div>
        <h2 className="m-4 text-2xl font-bold text-amber-400">
          Past Reservations
        </h2>
        <div className="overflow-x-auto p-4 flex gap-4 items-start">
          {userPastBookings.map((booking, index) => (
            <ReservationItem
              key={`reservation-${index}`}
              image_path={booking.screening.movie.image_path}
              dateTime={booking.screening.start_time}
              ticket_types={booking.ticket_types}
              seats={booking.seats}
              title={booking.screening.movie.title}
            />
          ))}
          {userPastBookings.length === 0 && (
            <p className="text-rose-400 font-bold">
              There are no past reservations!
            </p>
          )}
        </div>
      </div>
    );
  }
};

export default Reservations;
