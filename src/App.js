import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/employees" element={
          <PrivateRoute><Employees /></PrivateRoute>
        } />
        <Route path="/add-employee" element={
          <PrivateRoute><AddEmployee /></PrivateRoute>
        } />
        <Route path="/edit-employee/:id" element={
          <PrivateRoute><EditEmployee /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;