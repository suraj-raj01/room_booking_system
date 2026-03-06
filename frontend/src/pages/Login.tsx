import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="border w-full p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="border w-full p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white w-full py-2.5 rounded-lg hover:bg-blue-600 transition font-medium"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;