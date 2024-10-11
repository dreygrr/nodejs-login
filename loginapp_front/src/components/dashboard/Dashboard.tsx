import React from 'react';
import InputTest from './InputTest';
import Navbar from "./../navbar/Navbar";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Dashboard: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <InputTest />
    </>
  );
};

export default Dashboard;
