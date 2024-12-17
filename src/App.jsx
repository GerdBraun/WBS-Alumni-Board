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
import ProjectList from "./components/projects/ProjectList";
import ProjectDetail from "./components/projects/ProjectDetail";
import ErrorPage from "./components/general/ErrorPage";
import JobListPage from "./components/jobs/JobListPage";
import JobDetailsPage from "./components/jobs/JobDetailsPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/projects">
          <Route index element={<ProjectList />} />
          <Route path=":id" element={<ProjectDetail />} />
          <Route path="add" element={<>ProjectAdd</>} />
          <Route path="edit/:id" element={<>ProjectEdit</>} />
        </Route>
        <Route path="/jobs">
          <Route index element={<JobListPage/>} />
          <Route path=":id" element={<JobDetailsPage/>} />
          <Route path="add" element={<>JobAdd</>} />
          <Route path="edit/:id" element={<>JobEdit</>} />
        </Route>
        <Route path="/companies">
          <Route index element={<>CompanyList</>} />
          <Route path=":id" element={<>CompanyDetail</>} />
          <Route path="add" element={<>CompanyAdd</>} />
          <Route path="edit/:id" element={<>CompanyEdit</>} />
        </Route>
        <Route path="/users">
          <Route index element={<>UserList</>} />
          <Route path=":id" element={<>UserDetail</>} />
          <Route path="add" element={<>UserAdd</>} />
          <Route path="edit/:id" element={<>UserEdit</>} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
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
