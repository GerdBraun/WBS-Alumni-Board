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
        skills: data.Skills.map((skill) =>skill.id) || [],
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
    };
    const data = await fetchDataByModelAndId(props);
    setCompanies(data.results);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const saveUser = async (formData) => {

    console.log(formData);
    //return;


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
    // console.log({ data }, "user id: ", appUser?.id);
    try {
      await axios
        .put(`${import.meta.env.VITE_API_SERVER}/users/${appUser?.id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .catch((error) => {
          console.error(error);
        });

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
          <div className="card bg-base-100 w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {user.id === appUser.id ? (
                <span>Edit Your Profile</span>
              ) : (
                <span>Edit {user.firstName}&apos;s Profile</span>
              )}
            </h2>
            <form
              className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
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
              <label >
              <span className="block text-sm font-medium mb-2">Upload a new profile picture:</span>
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
                <select
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
                </select>
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
                      className="basic-multi-select"
                      classNamePrefix="select"
                      options={skills}
                      onChange={(val) => onChange(val.map((c) => c.value))}
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
            <Link to={-1} className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEdit;
