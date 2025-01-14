import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddQAForm({ question }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: question || {} });
  const { createQA, updateQA, deleteQA, appUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser) {
      toast.error("Please log in to ask a question!");
      navigate("/login");
    }
  }, [appUser, navigate]);

  useEffect(() => {
    if (question) {
      reset(question); 
    }
  }, [question, reset]);

  const isOwner = question?.ownerId === appUser?.id;
  const isAdminOrModerator =
    appUser?.role === "admin" || appUser?.role === "moderator";

  const onSubmit = async (data) => {
    try {
      //data.ownerId = appUser?.id;
      const payload = {
        title: data.title,
        description: data.description,
        ownerId: appUser?.id,
      };
      if (question) {
        if (isOwner || isAdminOrModerator) {
        console.log("Updating question with data:", payload);
        await updateQA(question.id, payload);
      } else {
        toast.error("You are not authorized to edit this question.");
        return;
      }
    } else {
        await createQA(payload);
      }
      reset();
      navigate("/qa");
    } catch (error) {
      console.error("Failed to submit question:", error);
    }
  };
  const handleDelete = async () => {
    
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQA(question.id);
        navigate("/qa");
      } catch (error) {
        console.error("Failed to delete question:", error);
        toast.error("Failed to delete question. Please try again.");
      }
    }
  };

  return (
    <form
      className="max-w-md mx-auto bg-base-100 border p-6 rounded-lg shadow-xl mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
       <h2 className="text-2xl font-bold mb-4 text-center">
        {question ? "Edit Question" : "Ask a Question"}
      </h2>

      {/* Title Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Title
        <input
          type="text"
          className="grow"
          placeholder="Enter Question Title"
          {...register("title", { required: "Title is required", maxLength: { value: 30, message: "Title must be 30 characters or fewer" } })}

        />
        {errors.title && ( <span className="text-error">{errors.title.message}</span> )}
      </label>

      {/* Description Field */}
      <label className="block mb-4">
        <span className="block text-sm font-medium mb-2">Description</span>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Enter Question Description"
          rows={3}
          {...register("description", { required: true })}
        />
        {errors.description && <span className="text-error">This field is required</span>}
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full mb-4">
        {question ? "Update Question" : "Submit Question"}
      </button>

      {/* Delete Button */}
      {question && (isOwner || isAdminOrModerator) && (
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={handleDelete}
        >
          Delete Question
        </button>
      )}
    </form>
  );
}
