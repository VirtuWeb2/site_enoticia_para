import axios from "axios";
import React, { useEffect, useState } from "react";
import Side from "../../components/sideContent/side/Side";
import NewSection from "../../components/cards/Sections";

const Marajo = () => {
  const [news, setNews] = useState([]);
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

  const filterNewsByRegion = (region) => {
    if (news.length === 0) {
      return [];
    }
    return news
      .filter((item) => item.reg === region)
      .slice(-20)
      .sort((a, b) => b.id - a.id);
  };

  const filteredMarajo = filterNewsByRegion("marajó");

  return (
    <main>
      <div className="container">
        <section className="mainContent">
          <NewSection regionTitle={"Marajó"} newsData={filteredMarajo} />
        </section>

        <section className="sideContent">
          <Side />
        </section>
      </div>
    </main>
  );
};

export default Marajo;
