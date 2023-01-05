import './App.css';
import { Routes, Route } from "react-router-dom";

import Login from './components/login/login';
import Register from './components/register/register';
import Forget from './components/forget/forget';

function App() {

  return (
    <Routes>
      <Route path="/:temptoken/:key/:notification_token" element={< Login />} />
      <Route path="/login" element={< Login />} />
      <Route path="/register/:temptoken/:key/:notification_token" element={< Register />} />
      <Route path="/forget/:temptoken/:key/:notification_token" element={< Forget />} />
    </Routes>
  );
}

export default App;
