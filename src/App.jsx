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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/signUp" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
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
