import { useForm } from "react-hook-form";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      {/* First Name Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        First Name
        <input
          type="text"
          name="firstName"
          className="grow"
          placeholder="Enter First Name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <span>This field is required</span>}
      </label>

      {/* Last Name Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Last Name
        <input
          type="text"
          name="lastName"
          className="grow"
          placeholder="Enter Last Name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <span>This field is required</span>}
      </label>

      {/* Email Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Email
        <input
          type="email"
          className="grow"
          name="email"
          placeholder="yourname@example.com"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </label>

      {/* Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Password
        <input
          type="password"
          className="grow"
          placeholder="Enter Password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
      </label>

      {/* Confirm Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-6">
        Confirm Password
        <input
          type="password"
          className="grow"
          placeholder="Confirm Password"
          name="confirmPassword"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && <span>This field is required</span>}
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Sign Up
      </button>
    </form>
  );
}
