import axios from "axios";

/**
 * fetches a list or an instance of a model (if id is defined)
 * @param {object} props {model, id, token, setLoading}
 * @returns fetched JSON data
 */
export const fetchDataByModelAndId = async (props) => {
  const { model, id, token, setLoading } = props;
  const idString = id ? `/${id}` : "";
  const url = `${import.meta.env.VITE_API_SERVER}/${model}${idString}`;
  try {
    const { data } = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.error(error);
      });
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

/**
 * fetches a list or an comments of a model with id (e.g. .../comments/jobs/1 will fetch the comments related to the job with id 1)
 * @param {Object} props  {model, id, token, setLoading}
 * @returns fetched JSON data
 */
export const getCommentsByModelAndId = async (props) => {
  const { model, id, token, setLoading } = props;
  const idString = id ? `/${id}` : "";
  const url = `${import.meta.env.VITE_API_SERVER}/comments/${model}${idString}`;
  setLoading(true);
  try {
    const { data } = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.error(error);
      });

    return data;
  } catch (error) {
    console.error("Something went wrong: " + error);
  } finally {
    setLoading(false);
  }
};
