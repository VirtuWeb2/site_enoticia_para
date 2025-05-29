import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ShareSocial } from "../../components/share/ShareSocial";
import Side from "../../components/sideContent/side/Side";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import "../home/mainContent/style.css";
import "../../components/sideContent/social/socialmedia.css";
import "./noticia.css";

const Noticia = () => {
  const [news, setNews] = useState([]);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [ad, setAd] = useState([]);
  const baseUrl = "https://api-sites-en.vercel.app";

  const getNews = async () => {
    try {
      const res = await axios.get(`${baseUrl}/news/${id}`);
      setItem(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // useEffect(() => {
  //   if (news.length) {
  //     const foundItem = news.find((item) => item.id === parseInt(id));
  //     window.scrollTo(0, 0);
  //     if (foundItem) {
  //       setItem(foundItem);
  //     }
  //   }
  // }, [id, news]);

  useEffect(() => {
    if (item) {
      const conteudo = document.querySelector(".desc");
      if (conteudo.querySelectorAll("img")) {
        const imgs = conteudo.querySelectorAll("img");
        const imgsDb = item.imgContent.split(",")
        imgs.forEach((i, index)=>{
          i.src = imgsDb[index]
        })
      }
    }
  }, [item]);

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

  const filteredBanner = filterBannerPosition("banner single page");

  return (
    <>
      {item ? (
        <main>
          <HelmetProvider>
            <Helmet>
              <title>{item.title.slice(0, 10)}.. | EN PARÁ</title>
              <meta property="og:title" content={item.title} />
              <meta property="og:image" content={item.cover} />
            </Helmet>
          </HelmetProvider>

          <div className="container">
            <section key={id} className="mainContent details">
              <h1 className="title">{item.title}</h1>

              <div className="date">
                <p>
                  {item.muni} | {item.cat}
                </p>
                <p> postado no dia: </p>
                <label>{moment(item.date).format("DD-MM-YYYY")}</label>
              </div>

              <div className="social">
                {ShareSocial.map((link) => (
                  <a
                    key={link.id}
                    className="socBox"
                    href={`${link.url}${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={link.icon}></i>
                    <span>Compartilhar</span>
                  </a>
                ))}
              </div>

              <img src={item.cover} alt="" />

              <div className="desc">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.desc),
                  }}
                ></p>
              </div>

              {filteredBanner.map((val, index) => (
                <section key={index} className="singleAd">
                  <a href={val.link} target="_blank" rel="noreferrer">
                    <img src={val.cover} alt="" />
                  </a>
                </section>
              ))}
            </section>
            <section className="sideContent">
              <Side />
            </section>
          </div>
        </main>
      ) : (
        <h1 style={{ width: "100%", textAlign: "center" }}>carregando...</h1>
      )}
    </>
  );
};

export default Noticia;
