import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Login.css';
import Top_Bar from "./Top-bar";
import SideMenu from "./Side-menu";
import '../Styles/Button.css';

const Renew = () => {
  const navigate = useNavigate();

  const handleRenew = async () => {
    try {
      // Send the POST request to the Flask API
      const response = await axios.get('https://traffic-backend-n4iz.onrender.com/renew');
      console.log('API response message:', response.data.message);
      if (response.status === 200) {
        alert(response.data.message);
        navigate('/dashboard');
      }
  } catch (error) {
        alert('Renew failed!');
        navigate('/dashboard');
  }
};


  return (
    <div className="Renew">
      <Top_Bar title="Renew"/>
      <SideMenu/>
      <div className="Renew-content" >
        <div style={{ border: '2px solid black', padding: '10px', margin: '50px 0', borderRadius: '5px',
        display: 'flex', justifyContent: 'center', Items: 'center', textAlign: 'center'}}>
          <button onClick={() => handleRenew()}>
            <h1>Renew 🔄</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Renew;