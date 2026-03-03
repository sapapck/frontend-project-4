import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './componets/Login';
import SignupForm from './componets/SignUp';
import P404 from './componets/Page404';
import PrivateRoute from './componets/Private';
import Chat from './componets/Chat';
import ModalRoot from './componets/Modals';

const App = () => {
  return (
    <BrowserRouter>
      <ModalRoot />
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="*" element={<P404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
