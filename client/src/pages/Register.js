import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ name, email, password });
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
          <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              className="w-full rounded border p-3"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full rounded border p-3"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full rounded border p-3"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full rounded bg-green-600 p-3 text-white hover:bg-green-700"
              type="submit"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a className="text-blue-600" href="/">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;