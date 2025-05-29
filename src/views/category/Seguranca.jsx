import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Side from "../../components/sideContent/side/Side";
import axios from "axios";
import NewSection from "../../components/cards/Sections";

const Seguranca = () => {
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

  const filteredItems = () => {
    if (news.length === 0) {
      return <p>Carregando...</p>;
    }
    return news.filter((item) => item.cat === "segurança");
  };

  const filtered = filteredItems();

  if (!Array.isArray(filtered)) return null;
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Categorias | EN PARÁ</title>
        </Helmet>
      </HelmetProvider>

      <main>
        <div className="container">
          <section className="mainContent">
            <NewSection
              regionTitle={"Notícias com a tag Segurança"}
              newsData={filtered}
            />
          </section>
          <section className="sideContent">
            <Side />
          </section>
        </div>
      </main>
    </>
  );
};

export default Seguranca;
