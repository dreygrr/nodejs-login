import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
