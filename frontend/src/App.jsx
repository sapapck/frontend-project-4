import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './componets/login';
import P404 from './componets/paje404';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="login" element={< SignupForm />} />
        <Route path="*" element={< P404 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;