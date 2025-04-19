// src/utils.js

export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const getAuthHeaders = () => {
    const token = getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  