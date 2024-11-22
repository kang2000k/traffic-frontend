import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import '../Styles/Login.css';
import Top_Bar from "./Top-bar";
import SideMenu from "./Side-menu";
import '../Styles/Button.css';

const Renew = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      await handleCallback(code);
    }
  }, [searchParams]);

  const handleRenew = async () => {
    try {
        const response = await axios.post('https://traffic-backend-n4iz.onrender.com/renew', {});
        const { auth_url } = response.data;

        window.location.href = auth_url;
    } catch (error) {
        alert('Renew failed!');
        navigate('/dashboard');
    }
  };

  const handleCallback = async (code) => {
    try {
      const response = await axios.get('https://traffic-backend-n4iz.onrender.com/callbackR',
        { code }
      );

      if (response.status === 200) {
        alert('Google Drive access renewed successfully!');
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        alert('Renew failed!');
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
