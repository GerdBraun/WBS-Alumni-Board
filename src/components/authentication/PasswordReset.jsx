import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired reset token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_SERVER}/auth/reset-password`,
        { token, password }
      );
      setMessage("Password reset successfully!");
      toast.success("Password reset successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <label className="input input-bordered flex items-center gap-2 mb-6">
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-6">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default PasswordReset;
