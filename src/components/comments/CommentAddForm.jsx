import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addComment } from "../../utility/saveData.js";

const CommentAddForm = ({ model, id, reload }) => {
  const {
    register,
    handleSubmit,
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
      toast.success("Comment successfully added");
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
          className="w-full p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit(addPropsAndSend)}
        >
          <h3 className="font-bold">Leave your idea</h3>
          <label className="">
            <textarea
              name="comment"
              className="textarea w-full bg-base-300"
              placeholder="Your thoughts"
              {...register("comment", {
                required: true,
              })}
            ></textarea>
            {errors.comment && <span>This field is required</span>}
          </label>

          {/* Submit Button */}
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
