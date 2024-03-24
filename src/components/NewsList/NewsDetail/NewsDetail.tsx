import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { api } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import {News} from "../../../models/News";
import './NewsDetail.css';
import {useTranslation} from "react-i18next";
import {decryptData} from "../../../utils/EncryptDecrypt";

const NewsDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News>();

  useEffect(() => {
    if (!id || !/^[a-zA-Z0-9+/]+={0,2}$/.test(id)) {
      navigate('/');
      return;
    }

    const fetchNewsById = async () => {
      try {
        const decryptedId = decryptId(id);

        if (isNaN(decryptedId)) {
          navigate('/');
          return;
        }

        const response = await api.getNewsById(decryptedId);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNewsById();
  }, [id, navigate]);

  if (!news) {
    return <div className="loading-indicator">
      <div className="loading-spinner"></div>
    </div>;
  }

  return (
    <div className="news-details-container">
      <div className="news-details-card">
        <h2 className="news-details-title">{news.title}</h2>
        {news.image && <img src={news.image} alt={news.title} className="news-details-image" />}
        <p className="news-details-content">{news.news}</p>
        <p className="news-details-date">{t('news.deail.date')}: {formatDate(news.date)}</p>
        <a href={news.link} className="news-details-link" target="_blank" rel="noopener noreferrer">{t('news.deail.go')}</a>
      </div>
    </div>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const decryptId = (idEncrypt: string) => {
  const decodedId = decodeURIComponent(idEncrypt);
  const decrypted = decryptData(decodedId, 'ev');
  if (decrypted === null) {
    console.error('Decryption failed');
    return null;
  }
  return decrypted;
};


export default NewsDetailsPage;
