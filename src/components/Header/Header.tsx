import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import './Header.css';
import usFlag from '../../assets/images/us.svg';
import mxFlag from '../../assets/images/mx.svg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const {t, i18n} = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo-svg"></div>
        </div>
        <div className="language-toggle">
          <button onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')} className="flag-button">
            {i18n.language !== 'es' ? <img src={usFlag} alt="USA Flag"/> : <img src={mxFlag} alt="Mexico Flag"/>}
          </button>
          <Link to="/" className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt}/>
          </Link>
        </div>
      </div>
      <nav>
        <Link to="/news">{t('titles.news')}</Link>
        <Link to="/users">{t('titles.users')}</Link>
      </nav>
    </header>
  );
};

export default Header;
