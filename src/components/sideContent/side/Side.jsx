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
      setNews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const getAd = async () => {
    try {
      const res = await axios.get(`${baseUrl}/ad`);
      setAd(res.data);
    } catch (err) {
      console.log(err);
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
