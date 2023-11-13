import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
const apiUrl = 'http://localhost:8000/api/v0/profile/';

export default function ProfilePage() {
  const { auth } = useAuth();
  const { accessToken } = auth;

  const [profile, setProfile] = useState(null);

  function fetchRectangle() {
    console.log(auth)
    
  }

  return (
    <div>
      {/* Вывод access token */}
      <p>Access Token: {accessToken}</p>

      {/* Ваш код страницы */}
      <button onClick={fetchRectangle}>Получить прямоугольник</button>
    </div>
  );

}