import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./hero.css";

const Hero = ({ news }) => {
  const [ads, setAds] = useState([]); // Mover para dentro do componente

  // Busca as notícias
  const sortedNews = news.slice(-4).sort((a, b) => b.id - a.id);

  // Buscar anúncios com a posição "banner hero"
  useEffect(() => {
    const getAds = async () => {
      try {
        const res = await axios.get("https://api-sites-en.vercel.app/ad");
        const filteredAds = res.data.filter(
          (ad) => ad.position === "banner hero"
        );
        setAds(filteredAds);
      } catch (err) {
        console.error("Erro ao buscar ads:", err);
      }
    };

    getAds();
  }, []); // A dependência está vazia, então o efeito só vai rodar uma vez quando o componente for montado

  // Efeito de prefetch para as últimas notícias
  useEffect(() => {
    if (news.length) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = news[news.length - 1].cover;
      link.as = "image";
      link.fetchPriority = "high";
      if (!document.querySelector("head").contains(link)) {
        document.querySelector("head").append(link);
      }
    }
  }, [news]);

  return (
    <>
      <section className="hero">
        <div className="container">
          {sortedNews.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
        </div>
      </section>

      {/* Aqui é onde botei os anúncios Ads*/}
      <section className="hero-ads">
        <div className="container">
          {ads.map((ad) => (
            <a
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              key={ad.id}
            >
              <img src={ad.cover} alt={ad.title} className="hero-ad-banner" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;
