import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './views/Loading';
import LoginRegister from './views/Login';
import Amadeus from './views/Amadeus';
import ViktorC from './views/VicktorC';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/e" element={<ViktorC />} />
        <Route path="/ds" element={<LoginRegister />} />
        <Route path="/d" element={<LoadingScreen />} />
        <Route path="/" element={<Amadeus />} />
      </Routes>
    </Router>
  );
}

export default App;
