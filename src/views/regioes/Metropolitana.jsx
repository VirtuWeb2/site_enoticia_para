import axios from "axios";
import React, { useEffect, useState } from "react";
import Side from "../../components/sideContent/side/Side";
import NewSection from "../../components/cards/Sections";

// Função para filtrar e ordenar notícias por região
const getFilteredNews = (news, region, limit = 20) => {
  return news
    .filter((item) => item.reg === region)
    .slice(-limit)
    .sort((a, b) => b.id - a.id);
};

const Metropolitana = () => {
  const [news, setNews] = useState([]);
  const baseUrl = "https://api-sites-en.vercel.app";

  // Função assíncrona para buscar as notícias
  const fetchNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/news`);
      setNews(response.data);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    }
  };

  // useEffect para carregar as notícias ao montar o componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Aplica o filtro para a região metropolitana
  const metropolitanNews = getFilteredNews(news, "metropolitano");

  return (
    <main>
      <div className="container">
        <section className="mainContent">
          <NewSection regionTitle="Metropolitana" newsData={metropolitanNews} />
        </section>

        <section className="sideContent">
          <Side />
        </section>
      </div>
    </main>
  );
};

export default Metropolitana;
