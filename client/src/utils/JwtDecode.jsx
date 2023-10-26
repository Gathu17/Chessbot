import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const JwtDecode = ({ token }) => {
  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      // console.log('Decoded Token:', decodedToken);
      const userId = decodedToken.userId;
      // console.log('User ID:', userId);

      localStorage.setItem('decodedToken', JSON.stringify(decodedToken.email));
      localStorage.setItem('userId', userId);

      setTimeout(() => {
        localStorage.removeItem('decodedToken');
        localStorage.removeItem('userId');
        // console.log("Removed token")
      }, 900000); 
    } catch (error) {
      // Handle the error
      // console.error('Error decoding token:', error);
    }
  }, [token]);

  return <></>;
};

export default JwtDecode;
