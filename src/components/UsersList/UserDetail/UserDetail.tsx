import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {api} from '../../../services/api';
import {decryptData} from '../../../utils/EncryptDecrypt';
import './UserDetail.css';
import {User} from "../../../models/User";
import {useTranslation} from "react-i18next";

const UserDetail: React.FC = () => {
  const {id} = useParams<{ id?: string }>();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserById = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      if (id === '0') {
        setUser({
          id: 0,
          name: '',
          user: '',
          password: '',
          active: false,
          admin: false,
        });
        return;
      }

      const decryptedId = decryptId(id);
      if (!decryptedId) {
        navigate('/');
        return;
      }

      try {
        const response = await api.getUserById(decryptedId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/');
      }
    };
    fetchUserById();
  }, [id, navigate]);

  const saveUserChanges = async () => {
    if (!user || !id) {
      alert(t("users.validation.password_length"));
      return;
    }

    if (!user.name || !user.user || !user.password) {
      alert(t("users.validation.fields_empty"));
      return;
    }

    if (user.password.length > 15 || user.password.length < 3) {
      alert(t("users.validation.password_length"));
      return;
    }

    const usernameRegex = /^[A-Za-z]+$/;
    if (!usernameRegex.test(user.user) || user.user.length <= 3) {
      alert(t("users.validation.username_format"));
      return;
    }

    const decryptedId = id === '0' ? id : decryptId(id);
    if (!decryptedId) {
      return;
    }

    try {
      const userData = {
        name: user.name,
        user: user.user,
        admin: user.admin,
        password: user.password,
        active: user.active,
      };

      const response = await api.updateUser(decryptedId, userData);
      alert("User updated successfully");
      navigate('/users');
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user");
    }
  };

  const deleteUser = async () => {
    if (!id) {
      alert("No user ID available for deactivation");
      return;
    }

    const decryptedId = id === '0' ? id : decryptId(id);
    if (!decryptedId) {
      alert("Failed to decrypt user ID");
      return;
    }

    try {
      const response = await api.deactivateUser(decryptedId);
      alert("User deactivated successfully");
      navigate('/users');
    } catch (error) {
      console.error("Failed to deactivate user:", error);
      alert("Failed to deactivate user");
    }
  };


  if (!user) {
    return <div className="loading-indicator">
      <div className="loading-spinner"></div>
    </div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-card">
        <img src={user.image || 'https://cdn-icons-png.flaticon.com/512/666/666201.png'}
             className="user-image" alt={user.name}/>
        <div className="user-info">
          <label htmlFor="name" className="input-label">{t('users.name')}</label>
          <input
            id="name"
            type="text"
            value={user.name || ''}
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="Name"
          />

          <label htmlFor="username" className="input-label">{t('users.user')}</label>
          <input
            id="username"
            type="text"
            value={user.user || ''}
            onChange={(e) => setUser({...user, user: e.target.value})}
            placeholder="Username"
          />

          <label htmlFor="password" className="input-label">{t('users.pass')}</label>
          <input
            id="pass"
            type="text"
            value={user.password || ''}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Password"
          />

          <div className="label-container">
            <input
              type="checkbox"
              checked={user.active}
              onChange={(e) => setUser({...user, active: e.target.checked})}
              id="active"
            />
            <label htmlFor="active">{t('users.status.active')}</label>
          </div>

          <div className="label-container">
            <input
              type="checkbox"
              checked={user.admin}
              onChange={(e) => setUser({...user, admin: e.target.checked})}
              id="admin"
            />
            <label htmlFor="admin">{t('users.rol.admin')}</label>
          </div>

          <button
            type="button"
            className="save-button"
            onClick={saveUserChanges}>
            {t('users.save')}
          </button>

          {id !== '0' && (
            <button
              type="button"
              className="delete-button"
              onClick={deleteUser}>
              {t('users.delete')}
            </button>
          )}
        </div>
      </div>
    </div>
  );

};

const decryptId = (idEncrypt: string) => {
  const decodedId = decodeURIComponent(idEncrypt);
  const decrypted = decryptData(decodedId, 'ev');
  if (decrypted === null) {
    return null;
  }
  return decrypted;
};

export default UserDetail;
