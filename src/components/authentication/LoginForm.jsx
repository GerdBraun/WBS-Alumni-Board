import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useApp();

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(login)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>

      {/* Email Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Email
        {/* register your input into the hook by invoking the "register" function */}
        <input
          type="email"
          className="grow"
          placeholder="yourname@example.com"
          name="email"
          {...register("email", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.email && <span>This field is required</span>}
      </label>

      {/* Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-6">
        Password
        {/* register your input into the hook by invoking the "register" function */}
        <input
          type="password"
          className="grow"
          placeholder="Enter Password"
          name="password"
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}
      </label>

      {/* Signup and Forgot Password Link */}
      <div className="flex justify-between items-center mb-4">
        <Link to="/signup"
          className="text-blue-500 hover:underline text-sm"
        >
          Sign Up
        </Link>

        <Link to="/recover-password"
          className="text-blue-500 hover:underline text-sm"
        >
          Forgot your Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Log In
      </button>
    </form>
  );
}
