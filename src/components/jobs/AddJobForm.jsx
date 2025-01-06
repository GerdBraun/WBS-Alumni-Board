import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddJobForm({ job }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createJob, updateJob, deleteJob, appUser, token } = useApp();
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!appUser) {
      toast.error("Please log in to add or edit a job!");
      navigate("/login");
    }
  }, [appUser, navigate]);

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/companys`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  // Populate the form fields if a job is being edited
  useEffect(() => {
    if (job) {
      reset(job); // Populate form fields with job details
    }
  }, [job, reset]);

  const onSubmit = async (data) => {
    try {
      data.ownerId = appUser?.id;

      if (job) {
        // Update job if job exists
        await updateJob(job.id, data);
        toast.success("Job updated successfully!");
      } else {
        // Create new job
        await createJob(data);
        toast.success("Job created successfully!");
      }

      reset(); // Clear form fields
      navigate("/jobs");
    } catch (error) {
      console.error("Failed to process job:", error);
      toast.error("Failed to process job. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(job.id);
        toast.success("Job deleted successfully!");
        navigate("/jobs");
      } catch (error) {
        console.error("Failed to delete job:", error);
        toast.error("Failed to delete job. Please try again.");
      }
    }
  };

  // Check if the user is the owner or an admin/moderator
  const isOwner = job?.ownerId === appUser?.id;
  const isAdminOrModerator = appUser?.role === "admin" || appUser?.role === "moderator";

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {job ? "Edit Job" : "Add a Job"}
      </h2>

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
          //value={job?.companyId || ""}
          //onChange={(e) => reset({ ...job, companyId: e.target.value })}
        >
          <option value="">Select a Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id} selected={company.id === job.Company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.companyId && <span className="text-error">This field is required</span>}
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full mb-4">
        {job ? "Update Job" : "Create Job"}
      </button>

      {/* Delete Button (only for owner or admin/moderator) */}
      {job && (isOwner || isAdminOrModerator) && (
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={handleDelete}
        >
          Delete Job
        </button>
      )}
    </form>
  );
}
