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

        <button onClick={() => alert('eita')} className='btn btn-save' type="button"><i className="fa-solid fa-cloud-arrow-up"></i> save</button>
      </div>
    </>
  );
};

export default Dashboard;
