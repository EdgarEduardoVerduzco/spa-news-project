import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import {useTranslation} from "react-i18next";
import loginHeaderImage from '../../assets/images/Driscolls.svg';
import {api} from "../../services/api";

interface LoginData {
  user: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({user: '', password: ''});
  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.login(loginData.user, loginData.password);
      console.log(response);
      navigate('/news');
    } catch (error) {
      console.error("Failed to log in:", error);
      alert("Failed to log in");
    }
  };

  return (
    <div className="login-container">
      <img src={loginHeaderImage} alt="Login Header"/>
      <div className="login-card">
        <div className="login-info">
          <label htmlFor="username" className="input-label">{t('users.user')}</label>
          <input
            id="username"
            type="text"
            value={loginData.user}
            onChange={(e) => setLoginData({...loginData, user: e.target.value})}
            placeholder={t('users.user')}
          />

          <label htmlFor="password" className="input-label">{t('users.pass')}</label>
          <input
            id="password"
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            placeholder={t('users.pass')}
          />

          <button
            type="button"
            className="login-button"
            onClick={handleLogin}>
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );


};

export default Login;
