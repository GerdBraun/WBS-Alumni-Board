import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About us</h1>
      <h2 className="text-xl mb-4">The place where the best meet!</h2>
      <p className="mb-4">Staying connected shouldn't be a challenge.</p>
      <p className="mb-4">
        Imagine a platform where you can check in on how your colleagues are
        doing, without endless messages or group chats. Our alumni community app
        makes it effortless to share updates, post job opportunities, and assist
        when it matters most.
      </p>
      <p className="mb-4">
        It’s not just about messaging; it’s about staying in the loop,
        supporting each other, and growing together. We’re solving the problem
        of disconnected alumni by building a network —no matter where life takes
        us. We aim to create a dynamic platform that caters to the diverse needs
        of our alumni network.
      </p>
      <p className="mb-4">Key Features:</p>
      <ol className="mb-4 list-decimal list-inside">
        <li className="mb-2">
          Job and Project Postings: Alumni can share job opportunities and
          project collaborations, facilitating professional growth and
          real-world application of skills.
        </li>
        <li className="mb-2">
          Company Directory: A comprehensive list of companies associated with
          our alumni, enabling users to explore potential employers and industry
          connections.
        </li>
        <li className="mb-2">
          Q&A Forums: A dedicated space for alumni to seek advice, share
          knowledge, and engage in meaningful discussions, enhancing collective
          learning.
        </li>
        <li className="mb-2">
          Matching: Users can specify their skills to receive personalized
          recommendations for jobs and projects, ensuring alignment with their
          expertise and career aspirations.
        </li>
      </ol>
      <p className="mb-4">
        By leveraging modern technologies and a user-centric design, our
        application serves as a testament to the skills we've developed during
        our coding journey.
      </p>
    </div>
  );
};

export default AboutUsPage;
