import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useApp } from "../../context/AppContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const UserEdit = () => {
  const { id } = useParams();
  const { appUser, loading, token, setLoading, setAppUser } = useApp();
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      loadUser();
      loadCompanies();
      loadSkills();
    }
  }, [id, token]);

  /**
   * Loads user data by ID.
   * @returns {Promise<void>}
   */
  const loadUser = async () => {
    const props = {
      model: "users",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await fetchDataByModelAndId(props);
    setUser(data);

    reset({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      companyId: data.Company?.id,
      skills: data.Skills.map((skill) => skill.id) || [],
    }),
      console.log(data);
  };

  /**
   * Loads skills data.
   * @returns {Promise<void>}
   */
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
    setSkills(options);
  };

  /**
   * Loads companies data.
   * @returns {Promise<void>}
   */
  const loadCompanies = async () => {
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
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const saveUser = async (formData) => {
    const { firstName, lastName, email, companyId, file, skills } = formData;
    console.log({ formData });
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      companyId: companyId,
      file: file[0],
      skills: skills,
    };

    try {
      const res = await axios
        .put(`${import.meta.env.VITE_API_SERVER}/users/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .catch((error) => {
          console.error(error);
        });
      if (id == appUser.id) {
        setAppUser(res.data);
        console.log("new appUser data", res.data);
      }

      toast.success("user data was saved successfully");
      navigate(-1); //go back to previous page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user && (
        <div
          className={`max-w-screen-lg mx-auto p-4 my-8 ${
            loading ? "hidden" : ""
          }`}
        >
          <div className="">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {user.id === appUser.id ? (
                <span className="">Edit Your Profile</span>
              ) : (
                <span>Edit {user.firstName}&apos;s Profile</span>
              )}
            </h2>
            <form
              className="max-w-md mx-auto bg-base-100 border p-6 rounded-lg shadow-md"
              method="post"
              encType="multipart/form-data"
              onSubmit={handleSubmit(saveUser)}
            >
              {/* First Name Field */}
              <label className="input input-bordered flex items-center gap-2 mb-4">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  className="grow"
                  placeholder="please enter your first name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-error">This field is required</span>
                )}
              </label>

              {/* Last Name Field */}
              <label className="input input-bordered flex items-center gap-2 mb-4">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  className="grow"
                  placeholder="please enter your last name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-error">This field is required</span>
                )}
              </label>

              {/* Email Field */}
              <label className="input input-bordered flex items-center gap-2 mb-4">
                Email:
                <input
                  type="text"
                  name="email"
                  className="grow"
                  placeholder="please enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error">This field is required</span>
                )}
              </label>

              {/* Avatar Field */}
              <label>
                <span className="block text-sm font-medium mb-2">
                  Upload a new profile picture:
                </span>
                <input
                  type="file"
                  name="file"
                  accept="image/png, image/jpeg"
                  className="file-input file-input-bordered file-input-md min-w-full mb-4 "
                  {...register("file", { required: false })}
                />
              </label>

              {/* Company ID Field */}
              <label className="block mb-4">
                <span className="block text-sm font-medium mb-2">Company</span>
                {/* <select
                  className="select select-bordered w-full"
                  defaultValue={user.Company?.id || ""}
                  {...register("companyId", { required: false })}
                >
                  <option value="">Select a Company</option>
                  {companies.length > 0 &&
                    companies.map((company) => (
                      <option key={company?.id} value={company?.id}>
                        {company.name}
                      </option>
                    ))}
                </select> */}

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

              <label className="block mb-4">
                <span className="block text-sm font-medium mb-2">Skills</span>
                <Controller
                  control={control}
                  name="skills"
                  defaultValue={user?.Skills && user.Skills.map((c) => c.id)}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputRef={ref}
                      value={
                        value && skills.filter((c) => value.includes(c.value))
                      }
                      isMulti
                      options={skills}
                      onChange={(val) => onChange(val.map((c) => c.value))}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  )}
                />
              </label>
              <br></br>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </form>
            <br></br>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEdit;
