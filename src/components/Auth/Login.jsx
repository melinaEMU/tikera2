import { useDispatch } from "react-redux";
import { changePage, login } from "../../slices/tikeraSlice";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../slices/apiSlice";
import { useNavigate } from "react-router";

const Login = () => {
  //Hooks
  const dispatch = useDispatch();
  const [sendLogin] = useLoginMutation();
  const navigate = useNavigate();

  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      setError("Missing email or password!");
      return;
    }

    try {
      const loginResult = await sendLogin({
        email: emailTrimmed,
        password: passwordTrimmed,
      }).unwrap();
      dispatch(
        login({
          name: loginResult.data.user.name,
          email: loginResult.data.user.email,
          role: loginResult.data.user.role,
          token: loginResult.data.token,
        })
      );
      navigate("/", { replace: true });
    } catch {
      setError("Incorrect email or password!");
    }
  };

  //Effects
  useEffect(() => {
    dispatch(changePage("LOGIN"));
  }, [dispatch]);

  return (
    <div className="mt-4 flex justify-center">
      <form
        action=""
        className="px-4 py-2 border-4 rounded border-amber-600 bg-rose-950"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h2>
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
        {!!error && (
          <div className="mb-4">
            <span className="text-rose-400 font-bold">{error}</span>
          </div>
        )}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="py-1 px-2 mx-2 border-2 rounded border-amber-600 bg-amber-400 text-black font-bold"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
