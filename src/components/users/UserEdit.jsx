import { useFieldArray, useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import { Navigate } from "react-router-dom";

const UserEdit = () => {
  const { appUser, loading, token, setLoading, setAppUser } = useApp();

  //setting up react form hook attributes and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    //watch,
    // reset,
  } = useForm({
    defaultValues: {
      firstName: appUser.firstName,
      lastName: appUser.lastName,
      email: appUser.email,
      companyId: appUser.Company?.id,
      ifEdit: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "skills",
  });

  const [companies, setCompanies] = useState([]);
  const [skillsList, setSkills] = useState([]);
  // const ifEdit = watch("ifEdit");
  //testing form out put
  const onSubmit = (data) => console.log("watch it: ", data);

  // Loading companies and skills from utility
  useEffect(() => {
    loadCompanies();
    loadSkills();
  }, []);
  //
  const loadCompanies = async () => {
    const props = {
      model: "companys",
      token: token,
      setLoading: setLoading,
    };
    const data = await fetchDataByModelAndId(props);
    console.log("my companies: ", data.results); // Log the data to the console
    setCompanies(data.results); //update the appUser
  };

  console.log({ companies });
  //fetch skills data from utility

  const loadSkills = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_SERVER}/skills`
      );
      console.log("all skills: ", data.results); // Log the data to the console
      setSkills(data.results) // Log the data to the console
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log("something went wrong: " + error);
    } finally {
      setLoading(false);
    }
  };

  console.log({ skillsList });
  //edit user function that sends the data to the server and then updates the appUser to reflect the updates and then finally navigates back to the previous page
  const editUser = async (formData) => {
    const { firstName, lastName, email, companyId, file } = formData;
    console.log({ formData });
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      companyId: companyId,
      file: file[0],
    };
    console.log({ data }, "user id: ", appUser?.id);
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

      toast.info("user data was saved successfully");
      Navigate(-1); //go back to previous page
    } catch (error) {
      console.error(error);
    }

    //refetch user data and update the appUser
    const loader = async () => {
      const props = {
        model: "users",
        id: appUser?.id,
        token: token,
        setLoading: setLoading,
      };
      const data = await fetchDataByModelAndId(props);

      setAppUser(data); //update the appUser
    };

    loader();
    Navigate(-1); //go back to previous page
  };

  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      {" "}
      <div className="card bg-base-100 w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Edit Your Profile
        </h2>
        <form
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* First Name Field */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            First Name:
            <input
              type="text"
              name="firstName"
              className="grow"
              placeholder={appUser.firstName}
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
              placeholder={appUser.lastName}
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
              placeholder={appUser.email}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-error">This field is required</span>
            )}
          </label>

          {/* Avatar Field */}
          <label className="input ">
            Upload a new profile picture:
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
              {...register("companyId", { required: false })}
            >
              <option value="">Select a Company</option>
              {companies.length > 0 &&
                companies.map((company) => (
                  <option
                    key={company?.id}
                    value={company?.id}
                    selected={company?.id === appUser.Company?.id || ""}
                  >
                    {company.name}
                  </option>
                ))}
            </select>
            {errors.companyId && (
              <span className="text-error">This field is required</span>
            )}
            {/* {companies && (<ul>{companies.map((aCompany)=>(<li key={aCompany.id}>{aCompany.name}</li>))}</ul>)} */}
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-2">Skills</span>
            <Select
              defaultValue={
                appUser.Skills.length !== 0 &&
                appUser.Skills.map((skill) => ({
                  value: skill.id,
                  label: skill.name,
                }))
              }
              isMulti
              name="skills"
              className="basic-multi-select"
              classNamePrefix="select"
              options={skillsList.map((skill) => ({
                value: skill.id,
                label: skill.name,
              }))}
              onChange={(e) => console.log("skills selected: ",e)}//{{ ...register(`skills.value.skill}`) }} //{(e) => console.log("skills selected: ",e)}
            />
          </label>
          <br></br>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>
        {/* <> {skillsList && (<ul>{skillsList.map((aSkill) => (<li key={aSkill.id}>{aSkill.name}</li>))}</ul>)}</> 
        {companies && (<ul>{companies.map((aCompany)=>(<li key={aCompany.id}>{aCompany.name}</li>))}</ul>)} */}
        <br></br>
        <Link to={-1} className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default UserEdit;
