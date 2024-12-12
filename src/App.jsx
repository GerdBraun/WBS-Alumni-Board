import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/authentication/SignupForm';
import LoginForm from './components/authentication/LoginForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}
