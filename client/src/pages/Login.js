import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

 return (
  <>
    <Navbar />

    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white/10 p-8 shadow-lg backdrop-blur-md border border-white/20">
        
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full rounded bg-white/20 p-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded bg-white/20 p-3 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/register">
            Register
          </a>
        </p>
      </div>
    </div>
  </>
);
}

export default Login;