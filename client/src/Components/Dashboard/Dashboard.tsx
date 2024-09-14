import React, { useEffect } from 'react'
import SideBar from '../SideNav/SideNav'
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  iat: number;
  userData: {
    _id: string;
    fullName:string
  };
}
function Dashboard() {
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
      console.log(decodedToken?.userData?.fullName,'decodedToke')
      localStorage.setItem('userName',JSON.stringify(decodedToken?.userData?.fullName))
    }
  }, []);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'50px'}}>
      <SideBar/>
    </div>
  )
}

export default Dashboard