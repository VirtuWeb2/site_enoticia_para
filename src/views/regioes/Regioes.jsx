import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Side from "../../components/sideContent/side/Side";
import axios from "axios";
import NewCard from "../../components/cards/Cards";

const Regioes = () => {
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

  const filteredAraguaia = filterNewsByRegion("araguaia");
  const filteredAmazonas = filterNewsByRegion("baixo amazonas");
  const filteredTocantins = filterNewsByRegion("baixo tocantins");
  const filteredCaete = filterNewsByRegion("caeté");
  const filteredCapim = filterNewsByRegion("capim");
  const filteredCarajas = filterNewsByRegion("carajas");
  const filteredGuajarina = filterNewsByRegion("guajarina");
  const filteredLago = filterNewsByRegion("lago tucuruí");
  const filteredMarajo = filterNewsByRegion("marajó");
  const filteredMetro = filterNewsByRegion("metropolitano");
  const filteredSalgado = filterNewsByRegion("salgado");
  const filteredTapajos = filterNewsByRegion("tapajós");
  const filteredXingu = filterNewsByRegion("xingu");

  
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Regiões | EN PARÁ</title>
        </Helmet>
      </HelmetProvider>

      <main>
        <div className="container">
          <section className="mainContent">
            <NewCard regionLink="/regiao/araguaia" regionTitle="Araguaia" newsData={filteredAraguaia} />
            <NewCard regionLink="/regiao/baixo-amazonas" regionTitle="Baixo Amazonas" newsData={filteredAmazonas} />
            <NewCard regionLink="/regiao/baixo-tocantins" regionTitle="Baixo Tocantins" newsData={filteredTocantins} />
            <NewCard regionLink="/regiao/caete" regionTitle="Caeté" newsData={filteredCaete} />
            <NewCard regionLink="/regiao/capim" regionTitle="Capim" newsData={filteredCapim} />
            <NewCard regionLink="/regiao/carajas" regionTitle="Carajás" newsData={filteredCarajas} />
            <NewCard regionLink="/regiao/guajarina" regionTitle="Guajarina" newsData={filteredGuajarina} />
            <NewCard regionLink="/regiao/lago-tucurui" regionTitle="Lago Tucuruí" newsData={filteredLago} />
            <NewCard regionLink="/regiao/marajo" regionTitle="Marajo" newsData={filteredMarajo} />
            <NewCard regionLink="/regiao/metropolitana" regionTitle="Metropolitana" newsData={filteredMetro} />
            <NewCard regionLink="/regiao/salgado" regionTitle="Salgado" newsData={filteredSalgado} />
            <NewCard regionLink="/regiao/tapajos" regionTitle="Tapajos" newsData={filteredTapajos} />
            <NewCard regionLink="/regiao/xingu" regionTitle="Xingu" newsData={filteredXingu} />
          </section>
          <section className="sideContent">
            <Side />
          </section>
        </div>
      </main>
    </>
  );
};

export default Regioes;
