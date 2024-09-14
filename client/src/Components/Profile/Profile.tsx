import axios from 'axios';
import './Profile.css'
import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct import
import Loader from '../utils/Loader/Loader';
import { baseUrl } from '../Urls';

interface userProfile {
  fullName: string;
  email: string;
}

interface JwtPayload {
  exp: number;
  iat: number;
  userData: {
    _id: string;
  };
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<userProfile | null>(null); 

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`${baseUrl}/userData/${userId}`);
      
      setUserData(response?.data?.user); 
    } catch (error: any) {
      console.error('Error fetching user data:', error?.response?.data || error?.message);
    }
  };

  useEffect(() => {
    const decodeToken = (token: string) => {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      const userId = decodedToken?.userData?._id; 
      if (userId) {
        fetchUserData(userId);
      }
    }
  }, []);

  return  (
    <div className="profile-container">
      {userData ? (
        <>
          <div className="profile-header">
            <h2>User Profile</h2>
          </div>
          <div className="profile-content">
            <p><span>Name:</span> {userData.fullName}</p>
            <p><span>Email:</span> {userData.email}</p>
          </div>
        </>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Profile;
