import { useDispatch } from "react-redux";
import { changePage, login } from "../../slices/tikeraSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../slices/apiSlice";
import { useNavigate } from "react-router";

const Register = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendRegister] = useRegisterMutation();

  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConformation, setPasswordConformation] = useState("");
  const [errors, setErrors] = useState([]);

  //Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameTrimmed = name.trim();
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    const passwordConformationTrimmed = passwordConformation.trim();

    if (
      !nameTrimmed ||
      !emailTrimmed ||
      !passwordTrimmed ||
      !passwordConformationTrimmed
    ) {
      setErrors([
        ...errors,
        "Missing name or email or password or password conformation!",
      ]);
      return;
    }

    try {
      const registerResult = await sendRegister({
        name: nameTrimmed,
        email: emailTrimmed,
        password: passwordTrimmed,
        password_confirmation: passwordConformationTrimmed,
      }).unwrap();
      dispatch(
        login({
          name: registerResult.data.user.name,
          email: registerResult.data.user.email,
          role: "user",
          token: registerResult.data.token,
        })
      );
      navigate("/", { replace: true });
    } catch (currentError) {
      setErrors([...errors, Object.values(currentError.data.errors).flat()]);
    }
  };

  //Effects
  useEffect(() => {
    dispatch(changePage("REGISTER"));
  }, [dispatch]);

  return (
    <div className="mt-4 flex justify-center">
      <form
        action=""
        className="px-4 py-2 border-4 rounded border-amber-600 bg-rose-950"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Register
        </h2>
        <div className="mb-4">
          <label htmlFor="user_name" className="font-bold text-amber-400">
            Name:
          </label>
          <br />
          <input
            id="user_name"
            type="text"
            className="ml-2 p-1 bg-black rounded border-2 border-amber-400 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="user_email" className="font-bold text-amber-400">
            Email:
          </label>
          <br />
          <input
            id="user_email"
            type="email"
            className="ml-2 p-1 bg-black rounded border-2 border-amber-400 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="user_password" className="font-bold text-amber-400">
            Password:
          </label>
          <br />
          <input
            id="user_password"
            type="password"
            className="ml-2 p-1 bg-black rounded border-2 border-amber-400 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="user_password_conformation"
            className="font-bold text-amber-400"
          >
            Password Conformation:
          </label>
          <br />
          <input
            id="user_password_conformation"
            type="password"
            className="ml-2 p-1 bg-black rounded border-2 border-amber-400 text-white"
            value={passwordConformation}
            onChange={(e) => setPasswordConformation(e.target.value)}
            required
          />
        </div>
        {errors.length !== 0 && (
          <div className="mb-4">
            {errors.map((err, index) => (
              <span key={index} className="text-rose-400 font-bold">
                {err}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="py-1 px-2 mx-2 border-2 rounded border-amber-600 bg-amber-400 text-black font-bold"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
