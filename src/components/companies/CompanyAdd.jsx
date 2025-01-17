import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";

function CompanyAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const { addCompany } = useApp();
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <form
        className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-xl border"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit(addCompany)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add a Company</h2>

        {/* Company name Field */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Company Name
          {/* register your input into the hook by invoking the "register" function */}
          <input
            type="text"
            className="grow"
            placeholder="company name"
            name="name"
            {...register("name", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.name && <span>This field is required</span>}
        </label>

        {/* Password Field */}
        <label>
          <span className="label-text">Company Logo (optional)</span>

          {/* register your input into the hook by invoking the "register" function */}
          <input
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            className="file-input file-input-bordered file-input-md min-w-full mb-4 "
            {...register("file", { required: false })}
          />
        </label>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Save
        </button>
      </form>
    </>
  );
}

export default CompanyAdd;
