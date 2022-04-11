import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Login from './components/Login';
import Register from './components/Register';
import { AuthContextProvider } from './AuthContext';
import { ModalContextProvider } from './ModalContext';

export const API_URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <>
      <AuthContextProvider>
        <ModalContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </ModalContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
