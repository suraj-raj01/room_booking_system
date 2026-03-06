import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="border w-full p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border w-full p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="border w-full p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          className="bg-blue-500 text-white w-full py-2.5 rounded-lg hover:bg-blue-600 transition font-medium"
        >
          Register
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;