import React, { useState, useEffect } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from 'axios';
import '../Styles/Login.css';
import Top_Bar from "./Top-bar";
import SideMenu from "./Side-menu";
import '../Styles/Button.css';

const GetDriveServiceAccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleCallback(code);
    }
  }, [searchParams]);

  const handleRenew = async () => {
    try {
      // Send the POST request to the Flask API
      const response = await axios.post('https://traffic-backend-n4iz.onrender.com/getGoogleAccess', {});
      const { auth_url, state } = response.data;

      window.location.href = auth_url;
    } catch (error) {
      alert('Get access failed!');
      navigate('/dashboard');
    }
  };

  const handleCallback = async (code) => {
    try {
      const response = await axios.post('https://traffic-backend-n4iz.onrender.com/callbackG',
        { code }
      );

      if (response.status === 200) {
        alert('Get Google Drive access successfully!');
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        alert('Get Google Drive access failed!');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Get Google Drive access failed!');
      navigate('/dashboard');
    }
  };


  return (
    <div className="GetAccess">
      <Top_Bar title="Get Google Drive Service Access"/>
      <SideMenu/>
      <div className="GetAccess-content" >
        <div style={{ border: '2px solid black', padding: '10px', margin: '50px 0', borderRadius: '5px',
        display: 'flex', justifyContent: 'center', Items: 'center', textAlign: 'center'}}>
          <button onClick={() => handleRenew()}>
            <h1>Get Google Drive Service Access 🔑</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetDriveServiceAccess;