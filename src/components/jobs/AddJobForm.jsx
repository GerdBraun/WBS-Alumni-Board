import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddJobForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createJob, appUser, token } = useApp();
  const [companies, setCompanies] = useState([]);

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/companys`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token if required
          },
        });
        setCompanies(response.data.results || []); 
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to fetch companies. Please try again.");
      }
    };
    fetchCompanies();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      data.ownerId = appUser?.id; // Automatically set ownerId
      await createJob(data); // Create the job
      console.log("Job successfully created:", data);
      toast.success("Job created successfully!"); 
    } catch (error) {
      console.error("Failed to create job:", error); // 
      toast.error("Failed to create job. Please try again."); 
    }
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add a Job</h2>

      {/* Title Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Title
        <input
          type="text"
          className="grow"
          placeholder="Enter Job Title"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="text-error">This field is required</span>}
      </label>

      {/* Description Field */}
      <label className="block mb-4">
        <span className="block text-sm font-medium mb-2">Description</span>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Enter Job Description"
          rows={3}
          {...register("description", { required: true })}
        />
        {errors.description && <span className="text-error">This field is required</span>}
      </label>

      {/* Location Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Location
        <input
          type="text"
          className="grow"
          placeholder="Enter Job Location"
          {...register("location", { required: false })}
        />
      </label>

      {/* Link Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Link
        <input
          type="url"
          className="grow"
          placeholder="Enter Job Link"
          {...register("link", {
            required: true,
            pattern: {
              value: /^(https?:\/\/)/,
              message: "Please enter a valid URL",
            },
          })}
        />
        {errors.link && <span className="text-error">{errors.link.message || "This field is required"}</span>}
      </label>

      {/* Company ID Field */}
      <label className="block mb-4">
        <span className="block text-sm font-medium mb-2">Company</span>
        <select
          className="select select-bordered w-full"
          {...register("companyId", { required: true })}
        >
          <option value="">Select a Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.companyId && <span className="text-error">This field is required</span>}
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Create Job
      </button>
    </form>
  );
}
