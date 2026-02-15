import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './componets/Login';
import SignupForm from './componets/SignUp';
import P404 from './componets/Page404';
import PrivateRoute from './componets/Private';
import Chat from './componets/Chat'


const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Chat/></PrivateRoute>} />
        <Route path="login" element={< LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="*" element={< P404 />} />

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;