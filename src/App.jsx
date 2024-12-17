import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/general/Layout";
import HomePage from "./components/general/HomePage";
import SignupForm from "./components/authentication/SignupForm";
import LoginForm from "./components/authentication/LoginForm";
import JobListPage from "./components/jobs/JobListPage";
import JobDetailsPage from "./components/jobs/JobDetailsPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/signUp" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
