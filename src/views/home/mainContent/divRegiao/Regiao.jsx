import React, { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "../../../../components/cards/Cards";

const Regiao = ({news}) => {
  // const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  // const baseUrl = "https://api-sites-en.vercel.appadmin";

  // const getNews = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}/news`);
  //     setNews(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getNews();
  // }, []);

  const filterNewsByRegion = (region) => {
    if (news.length === 0) {
      return [];
    }
    return news
      .filter((item) => item.reg === region)
      .slice(-20)
      .sort((a, b) => b.id - a.id);
  };

  const filteredLago = filterNewsByRegion("metropolitano");
  const filteredSalgado = filterNewsByRegion("marajó");
  const filteredXingu = filterNewsByRegion("carajás");
  const renderedItems = news.slice(-20).sort((a, b) => b.id - a.id);

  return (
    <>
      <NewCard
        regionLink={"/search"}
        regionTitle={"Notícias do Pará"}
        newsData={renderedItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={renderedItems.length}
        paginate={setCurrentPage}
      />
      <NewCard
        regionLink={"regiao/lago-tucurui"}
        regionTitle={"Notícias Metropolitanas"}
        newsData={filteredLago}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredLago.length}
        paginate={setCurrentPage}
      />
      <NewCard
        regionLink={"regiao/salgado"}
        regionTitle={"Notícias do Marajó"}
        newsData={filteredSalgado}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredSalgado.length}
        paginate={setCurrentPage}
      />
      <NewCard
        regionLink={"regiao/xingu"}
        regionTitle={"Notícias do Carajás"}
        newsData={filteredXingu}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredXingu.length}
        paginate={setCurrentPage}
      />
    </>
  );
};

export default Regiao;
