import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { useTranslation } from 'react-i18next';
import { api } from '../../services/api';
import './NewsList.css';
import { News } from "../../models/News";
import {encryptData} from "../../utils/EncryptDecrypt";

const NewsList: React.FC = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.getListNews(1);
        setNewsItems(response.data);
        const totalPages = Math.ceil(response.meta.total / response.meta.pageSize);
        setHasMore(1 < totalPages);
      } catch (error) {
        console.error("Failed to load news:", error);
      }
    };

    fetchNews();
  }, []);

  const lastNewsElementRef = useCallback((node:any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  useEffect(() => {
    if (page === 1) return;

    const fetchMoreNews = async () => {
      try {
        const response = await api.getListNews(page);
        setNewsItems(prevNews => [...prevNews, ...response.data]);
        const totalPages = Math.ceil(response.meta.total / response.meta.pageSize);
        setHasMore(page < totalPages);
      } catch (error) {
        console.error("Failed to fetch more news:", error);
      }
    };

    fetchMoreNews();
  }, [page]);

  return (
    <div className="news-container">
      <h1 className="news-list-title">{t('news.list')}</h1>
      {newsItems.length === 0 ? (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="news-grid">
          {newsItems.map((newsItem, index) => (
            <div ref={newsItems.length === index + 1 ? lastNewsElementRef : null} key={newsItem.id} className="news-card">
              <img src={newsItem.image} alt={newsItem.title} className="news-image"/>
              <div className="news-content">
                <h3 className="card-title">{newsItem.title}</h3>
                <p className="news-preview">{newsItem.news.substring(0, 100)}...</p>
              </div>
              <Link to={`/news/${encryptId(newsItem.id)}`} className="news-link">
                {t('news.more')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );


};

const encryptId = (id: number) => {
  const encryptedId = encryptData(id, 'ev');
  if (encryptedId === null) {
    console.error('Encryption failed');
    return null;
  }
  return encodeURIComponent(encryptedId);
};


export default NewsList;
