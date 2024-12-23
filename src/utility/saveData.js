import axios from "axios";

export const addComment = async (props) => {
  const { model, id, appUser, token, setLoading, comment } = props;
  const url = `${import.meta.env.VITE_API_SERVER}/comments`;

  const body = {
    parent:model,
    parentId:parseInt(id),
    ownerId:appUser.id,
    text:comment,
  };

  console.log(body);

  setLoading(true);

  try {
    const { data } = await axios
      .post(url, body, {
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

  console.log(props);
};
