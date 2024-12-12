export default function LoginForm() {
  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

      {/* Email Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Email
        <input type="email" className="grow" placeholder="yourname@example.com" />
      </label>

      {/* Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-6">
        Password
        <input type="password" className="grow" placeholder="Enter Password" />
      </label>

       {/* Forgot Password Link */}
       <div className="flex justify-end mb-4">
        <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
          Forgot your Password?
        </a>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Log In
      </button>
    </form>
  );
}
