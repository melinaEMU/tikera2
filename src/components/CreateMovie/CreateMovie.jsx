import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../slices/tikeraSlice";

const CreateMovie = () => {
  //Hooks
  const dispatch = useDispatch();

  //Effects
  useEffect(() => {
    dispatch(changePage("CREATE_MOVIE"));
  }, [dispatch]);

  return <p>Unimplemented</p>;
};

export default CreateMovie;
