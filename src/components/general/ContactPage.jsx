import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { sendMail } from "../../utility/sendMail.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, setLoading } = useApp();
  const navigate = useNavigate();

  const addPropsAndSend = async (props) => {
    props = { ...props, setLoading };
    try {
      const res = await sendMail(props);
      console.log(res);
      toast.success("Email was successfully sent");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.success("Ooops, something went wrong");
    }
  };
  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(addPropsAndSend)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>

      {/* First Name Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Your Name
        <input
          type="text"
          name="name"
          className="grow"
          placeholder="Enter Your Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
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

      <label className="">
        <textarea
          name="request"
          className="textarea w-full"
          placeholder="Your Request"
          {...register("request", {
            required: true,
          })}
        ></textarea>
        {errors.request && <span>This field is required</span>}
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        Send
      </button>
    </form>
  );
};

export default ContactPage;
