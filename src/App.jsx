import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodeEditor from "./components/CodeEditor";
import DockerAdminPage from './components/DockerAdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/admin" element={<DockerAdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
