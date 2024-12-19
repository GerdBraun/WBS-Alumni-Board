import axios from "axios";

export const sendMail = async (props) => {
  // TODO send the mail data to Post -> .../api/mail
  // e.g.:
  // {
  //     "emailTo":"webmaster@your-d-sign.de",
  //     "emailSubject":"testmail",
  //     "emailText":"emailText",
  //     "emailHTML":"<b>emailHTML</b>"
  // }
  const { name, email, request, setLoading } = props;

  const body = {
    emailTo: import.meta.env.VITE_ADMIN_EMAIL,
    emailSubject: `Request sent through contact form from ${name}`,
    emailText: `${name} (${email}) wrote:\n\r${request}`,
    emailHTML: `<b>${name} (<a href="mailto:${email}">${email}</a>) wrote:</b><br/>${request}`,
  };

  console.log(body);

  setLoading(true);
  try {
    const res = await axios
      .post(`${import.meta.env.VITE_API_SERVER}/mail`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.error(error);
      });
    return res;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
