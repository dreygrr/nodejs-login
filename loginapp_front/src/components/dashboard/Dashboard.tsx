import React from 'react';
import Book from './Book';
import Navbar from "./../navbar/Navbar";
import "./dashboard.css";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Dashboard: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="viewport">
        <Book />
      </div>
    </>
  );
};

export default Dashboard;
