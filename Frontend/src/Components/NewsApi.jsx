import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const NewsApi = () => {
  const [articles, setArticles] = useState([]);

  const getNews = () => {
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);

    const formatDate = (date) => date.toISOString().split('T')[0];

    axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'farming OR agriculture OR farmer',
        sortBy: 'publishedAt',
        from: formatDate(threeDaysAgo),
        to: formatDate(currentDate),
        domains: 'thehindu.com,indiatimes.com,ndtv.com,financialexpress.com,business-standard.com,indianexpress.com,livemint.com,news18.com,zeenews.india.com,timesofindia.indiatimes.com,aajtak.in,abplive.com,amarujala.com,jagran.com,punjabkesari.in,tv9bharatvarsh.com,indiatvnews.com,republicworld.com,etbrandequity.com,dharmakshetra.com,naidunia.com',
        
        apiKey: '4b0514f06c174c2991de172b4d6eb22e'
      }
    })
    .then(res => {
      const farmingArticles = res.data.articles.filter(article =>
        article.title.toLowerCase().includes('farming') ||
        article.title.toLowerCase().includes('agriculture') ||
        article.title.toLowerCase().includes('farmer') ||
        article.description.toLowerCase().includes('farming') ||
        article.description.toLowerCase().includes('agriculture') ||
        article.description.toLowerCase().includes('farmer')
      );

      farmingArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      setArticles(farmingArticles);
    })
    .catch(err => {
      console.error('Error fetching news:', err);
    });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
    <NavBar/>
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Farming News in Hindi (Last 3 Days)</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-2 text-sm md:text-base">{article.description}</p>
              <p className="text-xs md:text-sm text-gray-500 mb-4">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm md:text-base">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default NewsApi;
