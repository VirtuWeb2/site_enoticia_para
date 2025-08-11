import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Heading from "../../heading/Heading";
import SocialMedia from "../social/SocialMedia";
import TvPosts from "../tvPosts/TvPosts";
import axios from "axios";
import "./side.css";

const Side = () => {
  const { pathname } = useLocation();
  const [news, setNews] = useState([]);
  const [ad, setAd] = useState([]);
  const baseUrl = "https://api-sites-en.vercel.app";
  const getNews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/news`);
      if(Array.isArray(res.data)) {
        setNews(res.data);
      }else{
        setNews([]);
        console.warn("Resposta inesperada ao buscar notícias: ", res.data);
      }
    } catch (err) {
      console.error("Erro ao buscar as notícias ",err);
      setError("Não foi possível carregar as notícias.");
    } finally{
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const getAd = async () => {
    try {
      setLoadingAd(true);
      const res = await axios.get(`${baseUrl}/ad`);
     if(Array.isArray(res.data)){ 
      setAd(res.data);
    } else {
      setAd([]);
      console.warn("Resposta inesperada ao buscar anúncios: ", res.data);
    }
  }catch (err) {
      console.error("Erro ao buscar os anúncios ", err);
      setError("Não foi possível carregar os anúncios.");
    setAd([]);}
    finally {
      setLoadingAd(false);
    }
  };

  useEffect(() => {
    getAd();
  }, [setAd]);

  const filterBannerPosition = (position) => {
    if (!Array.isArray(ad) || ad.length === 0) {
      return [];
    }
    return ad.filter((item) => item.position === position);
  };

  const filteredBanner = filterBannerPosition("banner side");

  function removerAcentos(s) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return (
    <>
      <Heading title={"Mantenha-se Conectado!"} />
      <SocialMedia />

      {filteredBanner.map((item, index) => (
        <section key={index} className="banner">
          <Link to={item.link} target="_blank" aria-label="Acesse o site do Bento café-sushi-bar e faça seu pedido">
            <img src={item.cover} alt="" loading="lazy"/>
          </Link>
        </section>
      ))}

      {pathname !== "/tv-en-para" && <TvPosts />}

      <section className="catgorys">
        <Heading title={"Categorias"} />
        {news.reduce((unique, item) => {
            const catSemAcentos = removerAcentos(item.cat);
            return unique.includes(catSemAcentos)
              ? unique
              : [...unique, catSemAcentos];
          }, [])
          .map((cat, index) => {
            return (
              <Link key={index} to={`/${cat}`} className="category category1">
                {cat}
              </Link>
            );
          })}
      </section>
    </>
  );
};

export default Side;
