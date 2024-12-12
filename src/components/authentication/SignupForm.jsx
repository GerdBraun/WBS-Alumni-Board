export default function SignupForm() {
  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      {/* Name Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Name
        <input type="text" className="grow" placeholder="Your Name" />
      </label>

      {/* Email Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Email
        <input type="email" className="grow" placeholder="yourname@example.com" />
      </label>

      {/* Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Password
        <input type="password" className="grow" placeholder="Enter Password" />
      </label>

      {/* Confirm Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-6">
        Confirm Password
        <input type="password" className="grow" placeholder="Confirm Password" />
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Sign Up
      </button>
    </form>
  );
}

