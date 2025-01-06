import { useForm } from "react-hook-form";
import { useApp } from "../../context/AppContext";
//import { useState, useEffect } from "react";
//import { fetchDataByModelAndId } from "../../utility/fetchData";
import { Link } from "react-router-dom";

const UserEdit = () => {
  const { setLoading, appUser, token, loading } = useApp();

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
      avatar: appUser?.avatar || "undefined",
      ifEdit: false,
    },
  });
  //const [allCompanies, setAllCompanies] = useState([null]);
  const ifEdit = watch("ifEdit");
  //testing form out put
  const onSubmit = (data) => console.log(data);
  //console.log(watch("ifEdit"));

  // const loadCompaniesData = async () => {
  //   const props = {
  //     model: "companys",
  //     setLoading: setLoading,
  //     token: token,
  //   };
  //   const data = await fetchDataByModelAndId(props);

  //   setAllCompanies(data?.results || []);
  //   console.log(data.results);
  //   //console.log(usersData);
  // };
  // useEffect(() => {
  //   loadCompaniesData();
  // }, []);

  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      {" "}
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
      <div className=" font-normal mb-4 text-center ">
        <label>
          <input type="checkbox" {...register("ifEdit")} />
          &#128393; Please Select to Edit your Profile
        </label>
      </div>
      {!ifEdit && (
        <>
          <div className="card bg-base-100 w-full shadow-xl">
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
                Works at:
                <span className="font-normal">
                  {" " + appUser?.Company?.name || "undefined"}
                </span>
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
                  <span className="font-normal">undefined</span>
                )}
              </h3>

              <h3 className="font-bold">Projects posted:</h3>
              {/* {appUser.Projects.length !== 0 ? (
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
                <span className="font-normal">undefined</span>
              )} */}
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
                <span className="font-normal">undefined</span>
              )}
            </div>
          </div>
        </>
      )}
      {ifEdit && (
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
            Choose a profile picture (optional):
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg"
              className="file-input file-input-bordered file-input-md min-w-full mb-4 "
              //placeholder={appUser?.avatar || "undefined"}
              {...register("avatar", { required: false })}
            />
          </label>

          {/* <label className="block mb-4">
        <span className="block text-sm font-medium mb-2">Company</span>
        <select
          className="select select-bordered w-full"
          {...register("companyId", { required: true })}
        >
          <option value="">Select a Company</option>
          {allCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.companyId && (
          <span className="text-error">This field is required</span>
        )}
      </label> */}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>
      )}
      <br></br>
      <Link to={-1} className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default UserEdit;
