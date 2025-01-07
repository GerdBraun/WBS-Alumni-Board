import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { fetchCompanies } from "../../utility/fetchCompanies";

const UserEdit = () => {
  const { appUser, loading, token, setLoading, setAppUser } = useApp();
  //const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // reset,
  } = useForm({
    defaultValues: {
      firstName: appUser.firstName,
      lastName: appUser.lastName,
      email: appUser.email,
      companyId: appUser.Company?.id,
      //avatar: appUser.avatar,
      ifEdit: false,
    },
  });
  const [companies, setCompanies] = useState([null]);
  const ifEdit = watch("ifEdit");
  //testing form out put
  // const onSubmit = (data) => console.log(data);

  // Loading companies  from utility
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const companiesList = await fetchCompanies(token, setLoading);
        setCompanies(companiesList);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadCompanies();
  }, [token]);
 // console.log({ companies });
  const editUser = async (formData) => {
    //const { firstName, lastName, email, companyId } = formData;
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
      //navigate("/");
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
  };

  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      {" "}
      <div className=" font-normal mb-4 text-center ">
        <label>
          <input type="checkbox" {...register("ifEdit")} />
          &#128393; Please Select to Edit your Profile
        </label>
      </div>
      {!ifEdit && (
        <>
          <div className="card bg-base-100 w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Your Profile
            </h2>
            <figure className="w-56 h-auto">
              <img
                src={appUser?.avatar || "/profile.png"}
                alt={appUser.firstName}
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title text-xl font-bold">
                {appUser.firstName + " " + appUser.lastName}
              </h2>
              <h3 className="font-bold">
                Role:<span className="font-normal">{" " + appUser?.role}</span>
              </h3>
              <h3 className="font-bold">
                Works at:{" "}
                <span className="font-normal">
                  {appUser?.Company?.name || "-"}
                </span>
              </h3>
              <h3 className="font-bold">
                Email: <span className="font-normal">{appUser?.email}</span>
              </h3>
              <h3 className="font-bold">
                Skills:{" "}
                {appUser.Skills.length !== 0 ? (
                  appUser.Skills.map((skill) => (
                    <Link
                      to={`/skills/${skill.id}`}
                      key={skill.id}
                      className="badge badge-outline mr-2 font-normal"
                    >
                      {skill.name}
                    </Link>
                  ))
                ) : (
                  <span className="font-normal">-</span>
                )}
              </h3>

              <h3 className="font-bold">Projects posted:</h3>
              {appUser.Projects.length !== 0 ? (
                appUser.Projects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="Link underline text-blue-800"
                  >
                    {project.title}
                  </Link>
                ))
              ) : (
                <span className="font-normal">-</span>
              )}
              <h3 className="font-bold">Jobs posted:</h3>
              {appUser.Jobs.length !== 0 ? (
                appUser.Jobs.map((job) => (
                  <Link
                    to={`/jobs/${job.id}`}
                    key={job.id}
                    className="Link underline text-blue-800"
                  >
                    {job.title}
                  </Link>
                ))
              ) : (
                <span className="font-normal">-</span>
              )}
            </div>
          </div>
        </>
      )}
      {ifEdit && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Edit Your Profile
          </h2>
          <form
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(editUser)}
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

            {/*  {/* Company ID Field */}
            <label className="block mb-4">
              <span className="block text-sm font-medium mb-2">Company</span>
              <select
                className="select select-bordered w-full"
                {...register("companyId", { required: true })}
              >
                <option value="">Select a Company</option>
                {companies.map((company) => (
                  <option
                    key={company.id}
                    value={company.id}
                    selected={company.id === appUser.Company?.id}
                  >
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <span className="text-error">This field is required</span>
              )}
            </label>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Save Changes
            </button>
          </form>
        </>
      )}
      <br></br>
      <Link to={-1} className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default UserEdit;
