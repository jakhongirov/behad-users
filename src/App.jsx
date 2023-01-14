import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Forget from './components/forget/forget';
import Main from './components/main/main';

function App() {
  const [page, setPage] = useState(true)

  return (
    <Routes>
      <Route path="/forget/:temptoken/:key/:notification_token" element={< Forget setPage={setPage} />} />
      <Route path="/login/:temptoken/:key/:notification_token" element={< Main page={page} setPage={setPage} />} />
    </Routes>
  );
}

export default App;
