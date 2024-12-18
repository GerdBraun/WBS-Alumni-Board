import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";


export default function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  //get signup from context provider
   const { signup } = useApp();

  //testing form out put
  //const onSubmit = (data) => console.log(data);

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(signup)}
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
          {...register("password", {
            required: true,
            maxLength: 11,
            minLength: 8,
          })}
        />
        {errors.password && <span> Password with a minimum length of 8 characters is required!</span>}
      </label>

      {/* Confirm Password Field */}
      <label className="input input-bordered flex items-center gap-2 mb-6">
        Confirm Password
        <input
          type="password"
          className="grow"
          placeholder="Confirm Password"
          name="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm password!",
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || "Passwords should match!";
              },
            },
          })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "black" }}>{errors.confirmPassword.message}</p>
        )}
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Sign Up
      </button>
    </form>
  );
}
