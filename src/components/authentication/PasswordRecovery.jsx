import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PasswordRecovery() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_SERVER}/auth/recover-password`,
        { email }
      );
      toast.info("Password reset link sent! Check your email.");
    } catch (error) {
      toast.error("Error sending email. Please try again.");
      console.error(error);
    }
  };

  return (
    <div >
      <h2>Recover Password</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Email
          <input
            type="email"
            placeholder="yourname@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default PasswordRecovery;
