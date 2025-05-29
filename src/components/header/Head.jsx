import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./header.css";
const Head = () => {
  const [ad, setAd] = useState([]);
  const baseUrl = "https://api-sites-en.vercel.app";

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

  const filteredBanner = filterBannerPosition("banner header");

  return (
    <>
      <section className="head">
        <div className="container flexSB paddingTB">
          <div className="logo">
            <Link to="/">
              <img src="../images/logo.png" alt="Logo do É notícia Pará" />
            </Link>
          </div>
          {filteredBanner.map((item, index) => (
            <div key={index} className="ad">
              <Link to={item.link} target="_blank" aria-label="Acesse a página do Bento café-sushi-bar">
                <img src={item.cover} alt="" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Head;
