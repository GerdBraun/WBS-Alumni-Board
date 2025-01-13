import { Controller, useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import Select from "react-select";

export default function AddProjectForm({ project }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const {
    createProject,
    updateProject,
    deleteProject,
    appUser,
    token,
    setLoading,
  } = useApp();
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!appUser) {
      toast.error("Please log in to add or edit a project!");
      navigate("/login");
    }
  }, [appUser, navigate]);

  // Populate the form fields if a project is being edited
  useEffect(() => {
    if (project) {
      reset(project); // Populate form fields with project details
    }
  }, [project, reset]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    const props = {
      model: "skills",
      setLoading: setLoading,
      token: token,
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

      if (project) {
        // Update project if it exists
        await updateProject(project.id, data);
        // toast.success("Project updated successfully!");
      } else {
        // Create new project
        await createProject(data);
        // toast.success("Project created successfully!");
      }

      reset(); // Clear form fields
      navigate("/projects");
    } catch (error) {
      console.error("Failed to process project:", error);
      toast.error("Failed to process project. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(project.id);
        // toast.success("Project deleted successfully!");
        navigate("/projects");
      } catch (error) {
        console.error("Failed to delete project:", error);
        // toast.error("Failed to delete project. Please try again.");
      }
    }
  };

  // Check if the user is the owner or an admin/moderator
  const isOwner = project?.ownerId === appUser?.id;
  const isAdminOrModerator =
    appUser?.role === "admin" || appUser?.role === "moderator";

  return (
    <form
      className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {project ? "Edit Project" : "Add a Project"}
      </h2>

      {/* Title Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Title
        <input
          type="text"
          className="grow"
          placeholder="Enter Project Title"
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
          placeholder="Enter Project Description"
          rows={3}
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-error">This field is required</span>
        )}
      </label>

      {/* skills */}
      <label className="block mb-4">
        <Controller
          control={control}
          defaultValue={project?.Skills && project.Skills.map((c) => c.id)}
          name="skills"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              value={value && skills.filter((c) => value.includes(c.value))}
              onChange={(val) => onChange(val.map((c) => c.value))}
              options={skills}
              placeholder="Select Skills..."
              isMulti
            />
          )}
        />
      </label>

      {/* Date From Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        Start Date
        <input
          type="date"
          className="grow"
          {...register("dateFrom", { required: false })}
        />
      </label>

      {/* Date To Field */}
      <label className="input input-bordered flex items-center gap-2 mb-4">
        End Date
        <input
          type="date"
          className="grow"
          {...register("dateTo", { required: false })}
        />
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full mb-4">
        {project ? "Update Project" : "Create Project"}
      </button>

      {/* Delete Button (only for owner or admin/moderator) */}
      {project && (isOwner || isAdminOrModerator) && (
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={handleDelete}
        >
          Delete Project
        </button>
      )}
    </form>
  );
}
