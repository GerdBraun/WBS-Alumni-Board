import { Controller, useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchCompanies } from "../../utility/fetchCompanies";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import Select from "react-select";

export default function AddJobForm({ job }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { createJob, updateJob, deleteJob, appUser, token, setLoading } =
    useApp();
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!appUser) {
      toast.error("Please log in to add or edit a job!");
      navigate("/login");
    }
  }, [appUser, navigate]);

  // Loading companies  from utility
  useEffect(() => {
    if (token) loadCompanies();
  }, [token]);

  const loadCompanies = async () => {
    try {
      const props = {
        model: "companys",
        token: token,
        setLoading: setLoading,
        limit: 1000, //limiting the number of companies to 1000
      };
      const data = await fetchDataByModelAndId(props);
      const options = data.results.map((company) => ({
        value: company.id,
        label: company.name,
      }));

      setCompanies(options);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Populate the form fields if a job is being edited
  useEffect(() => {
    if (job) {
      reset(job); // Populate form fields with job details
    }
  }, [job, reset]);

  //Loading skills from utility
  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const props = {
      model: "skills",
      setLoading: setLoading,
      token: token,
      limit: 1000, //limiting the number of companies to 1000
    };
    const data = await fetchDataByModelAndId(props);
    const options = data.results.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }));
    console.log(options);
    setSkills(options);
  };

  const onSubmit = async (data) => {
    try {
      data.ownerId = appUser?.id;

      console.log("data.skills", data.skills);

      if (job) {
        // Update job if job exists
        await updateJob(job.id, data);
        //toast.success("Job updated successfully!");
        reset(); // Clear form fields
        navigate(-1);
      } else {
        // Create new job
        await createJob(data);
        //toast.success("Job created successfully!");
        reset(); // Clear form fields
        navigate("/jobs");
      }
    } catch (error) {
      console.error("Failed to process job:", error);
      //toast.error("Failed to process job. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(job.id);
        //toast.success("Job deleted successfully!");
        navigate("/jobs");
      } catch (error) {
        console.error("Failed to delete job:", error);
        //toast.error("Failed to delete job. Please try again.");
      }
    }
  };

  // Check if the user is the owner or an admin/moderator
  const isOwner = job?.ownerId === appUser?.id;
  const isAdminOrModerator =
    appUser?.role === "admin" || appUser?.role === "moderator";

  return (
    <form
      className="max-w-md mx-auto bg-base-100 border p-6 rounded-lg shadow-md mb-4"
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
        {errors.title && (
          <span className="text-error">This field is required</span>
        )}
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
        {errors.description && (
          <span className="text-error">This field is required</span>
        )}
      </label>

      {/* Skills Field */}
      <label className="block mb-4">
        <span className="block text-sm font-medium mb-2">Skills</span>
        <Controller
          control={control}
          defaultValue={job?.Skills && job.Skills.map((c) => c.id)}
          name="skills"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={value && skills.filter((c) => value.includes(c.value))}
              onChange={(val) => onChange(val.map((c) => c.value))}
              options={skills}
              placeholder="Select Skills..."
              isMulti
              className="react-select-container"
              classNamePrefix="react-select"
            />
          )}
        />
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
        {errors.link && (
          <span className="text-error">
            {errors.link.message || "This field is required"}
          </span>
        )}
      </label>

      {/* Company ID Field */}
      <label className="block mb-4">
        <span className="block text-sm font-medium mb-2">Company</span>
        <Controller
          control={control}
          name="companyId"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={companies.find((c) => c.value === value) || ""}
              onChange={(val) => onChange(val.value)}
              options={companies}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          )}
        />
        {errors.companyId && (
          <span className="text-error">This field is required</span>
        )}
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
