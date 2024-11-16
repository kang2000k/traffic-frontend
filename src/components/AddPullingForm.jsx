import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../Styles/Button.css';

const AddPullingForm = ({onClose, fetchData}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    data_source: '',
    header: '',
    frequency_min: '',
    params: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://traffic-backend-n4iz.onrender.com/addPull', formData, {
        headers: {
            'Content-Type': 'application/json',
        }
})
      if (response.status === 200) {
        alert('Created Successfully');
        fetchData();
        onClose();
      }
    } catch (error) {
      alert('Created failed');
      onClose();
    }
  };

  return (
      <form onSubmit={handleSubmit}>
          <label>
              Name:
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '1538px', marginLeft: '37px'}}
              />
          </label>

          <label>
              Description:
              <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: '1550px', height: '100px', fontSize: '20px', marginLeft: '10px'}}
              />
          </label>

          <label>
              Data source:
              <input
                  type="text"
                  name="data_source"
                  value={formData.data_source}
                  onChange={handleChange}
                  style={{ width: '1533px', marginLeft: '11px'}}
              />
          </label>

          <label>
              Header:
              <input
                  type="text"
                  name="header"
                  value={formData.header}
                  onChange={handleChange}
                  style={{ width: '1531px', marginLeft: '35px'}}
              />
          </label>

          <label>
              Parameters:
              <input
                  type="text"
                  name="params"
                  value={formData.params}
                  onChange={handleChange}
                  style={{ width: '1530px', marginLeft: '15px'}}
              />
          </label>

          <label>
              Frequency min:
              <input
                  type="text"
                  name="frequency_min"
                  value={formData.frequency_min}
                  onChange={handleChange}
                  style={{ width: '1520px', marginLeft: '5px'}}
              />
          </label>

          <button type="submit">Submit ✅</button>
          <button type="button" onClick={onClose}>Cancel ❌</button>
      </form>
  );
};

export default AddPullingForm;
