import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OAuth2Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy token từ tham số truy vấn
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // Xóa token khỏi URL bằng cách thay đổi state
      navigate('/', { replace: true });
    } else {
      navigate('/account/signin', { replace: true });
    }
  }, [location, navigate]);

  return null;
}

export default OAuth2Callback;