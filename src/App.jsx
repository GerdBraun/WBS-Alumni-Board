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
import AddJobForm from "./components/jobs/AddJobForm";
import WelcomePage from "./components/general/WelcomePage";
import SkillsList from "./components/skills/SkillsList";
import CompanyAdd from "./components/companies/CompanyAdd";
import QAList from "./components/qa/QAList";
import QADetails from "./components/qa/QADetails";
import ContactPage from "./components/general/ContactPage";
import PasswordReset from "./components/authentication/PasswordReset";
import PasswordRecovery from "./components/authentication/PasswordRecovery";
import UserList from "./components/users/UserList";
import UserDetail from "./components/users/UserDetail";
import UserProfile from "./components/users/UserProfile";
import UserEdit from "./components/users/UserEdit";
import EditJobForm from "./components/jobs/EditJobForm";
import SettingsPage from "./components/general/SettingsPage";
import { PrivacyPolicyPage } from "./components/general/PrivacyPolicyPage";
import TermsAndConditionsPage from "./components/general/TermsAndConditionsPage";
import AddProjectForm from "./components/projects/AddProjectForm";
import EditProjectForm from "./components/projects/EditProjectForm";
import CompanyList from "./components/companies/CompanyList";
import CompanyDetail from "./components/companies/CompanyDetail";
import CompanyEdit from "./components/companies/CompanyEdit";
import AddQAForm from "./components/qa/AddQAForm";
import EditQAForm from "./components/qa/EditQAForm";
//import { useEffect } from "react";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/recover-password" element={<PasswordRecovery />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/terms" element={<TermsAndConditionsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/projects">
          <Route index element={<ProjectList />} />
          <Route path=":id" element={<ProjectDetail />} />
          <Route path="add" element={<AddProjectForm/>} />
          <Route path="edit/:id" element={<EditProjectForm/>} />
        </Route>
        <Route path="/jobs">
          <Route index element={<JobListPage />} />
          <Route path=":id" element={<JobDetailsPage />} />
          <Route path="add" element={<AddJobForm/>} />
          <Route path="edit/:id" element={<EditJobForm/>} />
        </Route>
        <Route path="/companies">
          <Route index element={<CompanyList />} />
          <Route path=":id" element={<CompanyDetail />} />
          <Route path="add" element={<CompanyAdd />} />
          <Route path="edit/:id" element={<CompanyEdit />} />
        </Route>
        <Route path="/users">
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserDetail />} />
          <Route path="add" element={<>UserAdd</>} />
          <Route path="profile/:id" element={<UserProfile/>} />
          <Route path="edit/:id" element={<UserEdit/>} />
        </Route>
        <Route path="/qa">
          <Route index element={<QAList />} />
          <Route path=":id" element={<QADetails />} />
          <Route path="add" element={<AddQAForm />} />
          <Route path="edit/:id" element={<EditQAForm/>} />
        </Route>
        <Route path="/skills">
          <Route index element={<SkillsList />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Route>
    )
  );
 // useEffect(() => localStorage.clear(), []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
