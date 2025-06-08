import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../../slices/tikeraSlice";

const CreateScreening = () => {
  //Hooks
  const dispatch = useDispatch();

  //Effects
  useEffect(() => {
    dispatch(changePage("CREATE_SCREENING"));
  }, [dispatch]);

  return <p>Unimplemented</p>;
};

export default CreateScreening;
