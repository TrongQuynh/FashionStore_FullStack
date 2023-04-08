import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Outlet/>  
    </div>
  );
}

export default App;
