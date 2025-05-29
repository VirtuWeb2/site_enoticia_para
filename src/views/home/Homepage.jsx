import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import Hero from "./hero/Hero";
import Home from "./mainContent/Home";
import axios from "axios";
import Seo from '../../components/Seo'; // Corrigido: sem `{}`

const Homepage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function getNews() {
      try {
        const res = await axios.get("https://api-sites-en.vercel.app/news");
        setNews(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getNews();
  }, []);

  return (
    <HelmetProvider>
      <>
        <Seo
          title="EnoticiaPará"
          description="As principais notícias do estado do Pará, sobre política, segurança, esportes e atualidades."
          keywords="noticias, Pará, política, jornalismo, foco, segurança, esporte, Belém"
          canonical="https://www.enoticiapara.com.br/"
        />
        <Hero news={news} />
        <Home news={news} />
      </>
    </HelmetProvider>
  );
};

export default Homepage;
