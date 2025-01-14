import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import { addComment } from "../../utility/saveData.js";

const CommentAddForm = ({ model, id, reload }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loading, setLoading, appUser, token } = useApp();

  const addPropsAndSend = async (props) => {
    props = {
      ...props,
      setLoading,
      model,
      id,
      token,
      appUser,
    };
    try {
      const res = await addComment(props);
      console.log(res);
      toast.success("Comment added successfully");
      reset(); // Clear the textarea content
      reload();
    } catch (error) {
      console.error(error);
      toast.error("Ooops, something went wrong");
    }
  };
  return (
    <>
      {appUser && (
        <form
          className="w-full p-2 rounded-lg shadow-md"
          onSubmit={handleSubmit(addPropsAndSend)}
        >
          <h3 className="font-semibold">Share your ideas</h3>
          <label className="">
            <textarea
              name="comment"
              className="textarea textarea-bordered textarea-md w-full bg-base-100 border shadow-xl"
              placeholder="Type here..."
              {...register("comment", {
                required: true,
              })}
            ></textarea>
            {errors.comment && <span>This field is required</span>}
          </label>

          {/* Submit Button */}
          <br></br>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            Send
          </button>
        </form>
      )}
    </>
  );
};

export default CommentAddForm;
