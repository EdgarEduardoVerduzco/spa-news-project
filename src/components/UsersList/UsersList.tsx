import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {api} from '../../services/api';
import './UsersList.css';
import {User} from "../../models/User";
import {encryptData} from "../../utils/EncryptDecrypt";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faToggleOff, faToggleOn, faUser, faUserShield} from '@fortawesome/free-solid-svg-icons';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">{t('users.list')}</h1>
      {users.length === 0 ? (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-content">
                <div className="user-image-container">
                  <img src={user.image || 'https://cdn-icons-png.flaticon.com/512/666/666201.png'} alt='{user.name}'
                       className="user-imagen"/>
                </div>
                <div className="user-details">
                  <div className="user-name">
                    <FontAwesomeIcon icon={faUser}/> {user.name}
                  </div>
                  <div className="user-status">
                    <span className="status-icon">
                      {user.active ? (
                        <FontAwesomeIcon icon={faToggleOn} title="Activo"/>
                      ) : (
                        <FontAwesomeIcon icon={faToggleOff} title="Inactivo"/>
                      )}
                      {user.active ? t('users.status.active') : t('users.status.inactive')}
                    </span>
                  </div>

                  <div className="user-status">
                    <span className="role-icon">
                      {user.admin ? (
                        <FontAwesomeIcon icon={faUserShield} title="Administrador"/>
                      ) : (
                        <FontAwesomeIcon icon={faUser} title="Usuario"/>
                      )}
                      {user.admin ? t('users.rol.admin') : t('users.rol.user')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="user-link-container">
                <Link to={`/users/${encryptId(user.id)}`} className="user-link">
                  {t('users.view_details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/users/0" className="fab-button">
        <FontAwesomeIcon icon={faPlus}/>
      </Link>
    </div>
  );


};

const encryptId = (id: number) => {
  const encryptedId = encryptData(id.toString(), 'ev');
  if (encryptedId === null) {
    console.error('Encryption failed');
    return '';
  }
  return encodeURIComponent(encryptedId);
};

export default UsersList;