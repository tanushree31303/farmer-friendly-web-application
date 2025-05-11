import React, { useEffect, useState } from 'react';
import './MyProfile.css';
import { callApi, getSession } from './api';

function MyProfile() {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const csrid = getSession('csrid');
    if (!csrid) return;

    const request = JSON.stringify({ csrid });
    callApi('POST', 'http://localhost:8089/users/getprofile', request, (res) => {
      const data = JSON.parse(res);
      setUser(data);
    });
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission to update profile
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get CSID (user token)
    const csrid = getSession('csrid');
    if (!csrid) {
      setError('User not logged in');
      return;
    }

    // Create request payload
    const updatedUser = {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profilePicture: user.profilePicture // Add the profile picture URL if applicable
    };

    const requestPayload = JSON.stringify(updatedUser);

    // Make API call to update the user profile
    callApi('POST', 'http://localhost:8089/users/updateProfile', requestPayload, (res) => {
      if (res === 'User profile updated successfully!') {
        setSuccessMessage('Profile updated successfully!');
        setEditMode(false);
        setUser(updatedUser);
      } else {
        setError('Error updating profile');
      }
    });
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      {!editMode ? (
        <div className="profile-display">
          <p><strong>Full Name:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Profile Picture:</strong><br />
            {user.profilePicture ? <img src={user.profilePicture} alt="Profile" width="100" height="100" /> : 'No profile picture set'}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={user.fullname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInputChange}
            disabled
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={user.profilePicture}
            onChange={handleInputChange}
          />
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default MyProfile;
